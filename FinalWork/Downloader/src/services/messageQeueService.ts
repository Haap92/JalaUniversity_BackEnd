import amqp from "amqplib/callback_api";
import DownloadFile from "../db/entities/downloadFile";
import { DownloadFileValues } from "../types";
import DownloadFileService from "./downloadFileService";
import FileReportService from "./fileReportService";
import FileReport from '../db/entities/fileReport';
import DriveAccountService from "./driveAccountService";
import DriveAccount from "../db/entities/driveAccount";

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
  console.log("Message Sent: " + message);
  setTimeout(function () {
    channel.close(() => {
    });
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

  const queueUploader = "Uploader-Downloader";
  const queueStatsFile = "Stats-Downloader-File";
  const queueStatsAccount = "Stats-Downloader-Account";

  await channel.assertQueue(queueUploader, {
    durable: false,
  });
  await channel.assertQueue(queueStatsFile, { durable: false });
  await channel.assertQueue(queueStatsAccount, { durable: false });

  channel.consume(
    queueUploader,
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
      console.log(
        `File: "${uploadedFile.uploaderId}" from Google Drive Account: "${uploadedFile.accountId}" has been created in Downloader DB.`
      );
    },
    { noAck: true }
  );

  channel.consume(
    queueStatsAccount,
    async (message) => {
      const accountReport = JSON.parse(message!.content.toString());
      const driveAccountService = new DriveAccountService()

      await driveAccountService.updateOrCreateAccountByAccountId(accountReport)
    },
    { noAck: true }
  );

  channel.consume(
    queueStatsFile,
    async (message) => {
      const fileReport = JSON.parse(message!.content.toString());
      const fileReportService = new FileReportService()
  
      await fileReportService.updateOrCreateFileByUploaderId(fileReport)
    },
    { noAck: true }
  );
  console.log("Message Queue Service running on Downloader.");
}
