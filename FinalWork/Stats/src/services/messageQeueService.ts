import amqp from "amqplib/callback_api";
import { DriveAccountValues, FileReportValues } from "../types";

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

export async function sendFileToDownloader(message: string) {
  const queue = "Stats-Downloader-File";
  await sendMessage(queue, message);
}

export async function sendAccountToDownloader(message: string) {
  const queue = "Stats-Downloader-Account";
  await sendMessage(queue, message);
}

export async function statusListener() {
  const channel = await connectToRabbitMq();

  const queueUploader = "Uploader-Stats";
  const queueDownloader = "Downloader-Stats";
  const queueDownloaderFile = "Downloader-Stats-File";
  const queueDownloaderAccount = "Downloader-Stats-Account";

  await channel.assertQueue(queueUploader, { durable: false });
  await channel.assertQueue(queueDownloader, { durable: false });
  await channel.assertQueue(queueDownloaderFile, { durable: false });
  await channel.assertQueue(queueDownloaderAccount, { durable: false });

  channel.consume(
    queueUploader,
    (message) => {
      const receivedMessage = JSON.parse(message!.content.toString());
      console.log(
        `File "${receivedMessage.filename}" has been ${receivedMessage.status}.`
      );
    },
    { noAck: true }
  );

  channel.consume(
    queueDownloader,
    (message) => {
      const receivedMessage = JSON.parse(message!.content.toString());
      console.log(
        `File "${receivedMessage.filename}" has been ${receivedMessage.status}.`
      );
    },
    { noAck: true }
  );

  channel.consume(
    queueDownloaderFile,
    async (message) => {
      const file = JSON.parse(message!.content.toString());
      if(file.id){
      const fileReport: FileReportValues = {
        id: file.id,
        uploaderId: file.uploaderId,
        downloadsTotal: file.downloadsTotal + 1,
        downloadsToday: file.downloadsToday + 1,
        acumulatedSizeTotal: file.acumulatedSizeTotal + file.size,
        acumulatedSizeDay: file.acumulatedSizeDay + file.size
      };
      await sendFileToDownloader(JSON.stringify(fileReport))
    } else {
      const fileReportElse: FileReportValues = {
        uploaderId: file.uploaderId,
        downloadsTotal: file.downloadsTotal + 1,
        downloadsToday: file.downloadsToday + 1,
        acumulatedSizeTotal: file.acumulatedSizeTotal + file.size,
        acumulatedSizeDay: file.acumulatedSizeDay + file.size
      };
      await sendFileToDownloader(JSON.stringify(fileReportElse))
    }
    },
    { noAck: true }
  );

  channel.consume(
    queueDownloaderAccount,
    async (message) => {
      const account = JSON.parse(message!.content.toString());
      const accountReport: DriveAccountValues = {
        id: account.id,
        accountId: account.accountId,
        downloadsTotal: account.downloadsTotal + 1,
        downloadsToday: account.downloadsToday + 1,
        acumulatedSizeTotal: account.acumulatedSizeTotal + account.filesize,
        acumulatedSizeDay: account.acumulatedSizeDay + account.filesize
      };
      await sendAccountToDownloader(JSON.stringify(accountReport))
    },
    { noAck: true }
  );
}
