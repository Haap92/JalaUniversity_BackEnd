import amqp from "amqplib/callback_api";
import DownloadFile from "../db/entities/downloadFile";
import { DownloadFileValues, InactiveAccountValues } from "../types";
import DownloadFileService from "./downloadFileService";
import FileReportService from "./fileReportService";
import DriveAccountService from "./driveAccountService";
import DriveAccount from "../db/entities/driveAccount";
import { Point } from "@influxdata/influxdb-client";
import InfluxDbService from "./influxDbService";
import logger from "jet-logger";

const rabbitMqConfig = {
  protocol: "amqp",
  hostname: "localhost",
  port: 5672,
  username: "haap",
  password: "microservices",
};

function connectToRabbitMq(): Promise<amqp.Channel> {
  return new Promise((resolve, reject) => {
    amqp.connect(rabbitMqConfig, (error0, connection) => {
      if (error0) {
        return reject(error0);
      }

      connection.createChannel((error1, channel) => {
        if (error1) {
          return reject(error1);
        }

        resolve(channel);
      });
    });
  });
}

async function sendMessage(queue: string, message: string) {
  const channel = await connectToRabbitMq();
  channel.assertQueue(queue, { durable: false });
  channel.sendToQueue(queue, Buffer.from(message));
  logger.info("Message Sent: " + message);
  setTimeout(function () {
    channel.close(() => {});
  }, 500);
}

export async function sendToStatus(message: string) {
  const queue = "Downloader-Stats";
  await sendMessage(queue, message);
}

export async function sendFileToStatus(message: string) {
  const queue = "Downloader-Stats-File";
  await sendMessage(queue, message);
}

export async function sendAccountToStatus(message: string) {
  const queue = "Downloader-Stats-Account";
  await sendMessage(queue, message);
}

export async function receiveFromUploader() {
  const channel = await connectToRabbitMq();

  const queueUploaderCreateFile = "Uploader-Downloader-create-file";
  const queueUploaderDeleteFile = "Uploader-Downloader-delete-file";
  const queueUploaderCreateAccount = "Uploader-Downloader-create-account";
  const queueUploaderDeleteAccount = "Uploader-Downloader-delete-account";
  const queueStatsFile = "Stats-Downloader-File";
  const queueStatsAccount = "Stats-Downloader-Account";

  await channel.assertQueue(queueUploaderCreateFile, {
    durable: false,
  });
  await channel.assertQueue(queueUploaderDeleteFile, {
    durable: false,
  });
  await channel.assertQueue(queueUploaderCreateAccount, {
    durable: false,
  });
  await channel.assertQueue(queueUploaderDeleteAccount, {
    durable: false,
  });
  await channel.assertQueue(queueStatsFile, { durable: false });
  await channel.assertQueue(queueStatsAccount, { durable: false });

  channel.consume(
    queueUploaderCreateFile,
    async (message) => {
      const uploadedFile: DownloadFileValues = JSON.parse(
        message!.content.toString()
      );
      const downloadFileService = new DownloadFileService();
      const downloadFile = new DownloadFile();
      downloadFile.uploaderId = uploadedFile.uploaderId;
      downloadFile.driveId = uploadedFile.driveId;
      downloadFile.name = uploadedFile.name;
      downloadFile.webViewLink = uploadedFile.webViewLink;
      downloadFile.webContentLink = uploadedFile.webContentLink;
      downloadFile.size = uploadedFile.size;
      downloadFile.accountId = uploadedFile.accountId;

      await downloadFileService.create(downloadFile);
      logger.info(
        `File: "${uploadedFile.uploaderId}" from Google Drive Account: "${uploadedFile.accountId}" has been created in Downloader DB.`
      );
    },
    { noAck: true }
  );

  channel.consume(
    queueUploaderDeleteFile,
    async (message) => {
      const uploadedFile: DownloadFileValues = JSON.parse(
        message!.content.toString()
      );
      const downloadFileService = new DownloadFileService();
      const uploaderId = uploadedFile.uploaderId;
      const accountId = uploadedFile.accountId;

      await downloadFileService.deleteByUploaderAndAccountId(
        uploaderId,
        accountId
      );
      logger.info(
        `File: "${uploadedFile.uploaderId}" from Google Drive Account: "${uploadedFile.accountId}" has been deleted in Downloader DB.`
      );
    },
    { noAck: true }
  );

  channel.consume(
    queueUploaderCreateAccount,
    async (message) => {
      const newAccount: any = JSON.parse(message!.content.toString());
      const driveAccountService = new DriveAccountService();
      const driveAccount = new DriveAccount();
      driveAccount.accountId = newAccount.id;
      driveAccount.downloadsTotal = 0;
      driveAccount.downloadsToday = 0;
      driveAccount.consecutiveDownloads = 0;
      driveAccount.acumulatedSizeTotal = 0;
      driveAccount.acumulatedSizeDay = 0;
      driveAccount.activeAccount = "yes";

      await driveAccountService.create(driveAccount);
      logger.info(
        `Google Drive Account: "${driveAccount.accountId}" has been created in Downloader DB.`
      );
    },
    { noAck: true }
  );

  channel.consume(
    queueUploaderDeleteAccount,
    async (message) => {
      const updateAccount: any = JSON.parse(message!.content.toString());
      const driveAccountService = new DriveAccountService();
      const accountId = updateAccount.id;
      const updateInactiveAccount: InactiveAccountValues = {
        consecutiveDownloads: 0,
        activeAccount: "no",
      };

      await driveAccountService.updateInactiveAccountByAccountId(
        accountId,
        updateInactiveAccount
      );
      logger.info(
        `Google Drive Account: "${accountId}" is now inactive in Downloader DB.`
      );
    },
    { noAck: true }
  );

  channel.consume(
    queueStatsAccount,
    async (message) => {
      const accountReport = JSON.parse(message!.content.toString());
      const driveAccountService = new DriveAccountService();

      const point = new Point("accounts")
        .tag("account Id", accountReport.accountId)
        .floatField("Downloads Today", accountReport.downloadsToday)
        .floatField("Downloads Total", accountReport.downloadsTotal)
        .floatField(
          "Acumulated File Sizes Today",
          accountReport.acumulatedSizeDay
        )
        .floatField(
          "Acumulated File Sizes Total",
          accountReport.acumulatedSizeTotal
        )
        .timestamp(new Date());
      const influxDbService = new InfluxDbService();
      influxDbService.writeApi.writePoints([point]);

      await driveAccountService.updateOrCreateAccountByAccountId(accountReport);
    },
    { noAck: true }
  );

  channel.consume(
    queueStatsFile,
    async (message) => {
      const fileReport = JSON.parse(message!.content.toString());
      const fileReportService = new FileReportService();
      if (fileReport.id) {
        const point = new Point("file_Download")
          .tag("file Id", fileReport.uploaderId)
          .floatField("Downloads Today", fileReport.downloadsToday)
          .floatField("Downloads Total", fileReport.downloadsTotal)
          .floatField(
            "Acumulated File Sizes Today",
            fileReport.acumulatedSizeDay
          )
          .floatField(
            "Acumulated File Sizes Total",
            fileReport.acumulatedSizeTotal
          )
          .timestamp(new Date());
        const influxDbService = new InfluxDbService();
        influxDbService.writeApi.writePoints([point]);
        await fileReportService.updateFileReport(fileReport);
      } else {
        await fileReportService.create(fileReport);
      }
    },
    { noAck: true }
  );
  logger.info("Message Queue Service running on Downloader.");
}
