import amqp from "amqplib/callback_api";
import DownloadFile from "../db/entities/downloadFile";
import { DownloadFileValues } from "../types";
import DownloadFileService from "./downloadFileService";

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
      console.log("Channel closed");
    });
  }, 500);
}

export async function sendToStatus(message: string) {
  const queue = "Downloader-Status";
  await sendMessage(queue, message);
}

export async function receiveFromUploader() {
  const channel = await connectToRabbitMq();

  const queueUploader = "Uploader-Downloader";

  await channel.assertQueue(queueUploader, {
    durable: false,
  });

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
      downloadFile.webViewLink = uploadedFile.webViewLink;
      downloadFile.webContentLink = uploadedFile.webContentLink;
      downloadFile.size = uploadedFile.size;
      downloadFile.accountId = uploadedFile.accountId;

      await downloadFileService.create(downloadFile);
      console.log(
        `File "${uploadedFile.uploaderId}" has been created in Downloader DB.`
      );
    },
    { noAck: true }
  );
}
