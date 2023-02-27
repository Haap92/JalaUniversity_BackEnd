import { Point } from "@influxdata/influxdb-client";
import amqp = require("amqplib/callback_api");
import FileService from "./fileService";
import GoogleDriveAccountService from "./googleDriveAccountService";
import InfluxDbService from "./influxDbService";

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
  setTimeout(function () {
    channel.close(() => {
    });
  }, 500);
}

export async function sendToUpload(message: string) {
  const queue = "Uploader-Drive";
  console.log("File sent to Drive: " + message);
  await sendMessage(queue, message);
}

export async function sendToCreateAccount(message: string) {
  const queue = "Uploader-Drive-Account-create";
  console.log("Account sent to Drive: " + message);
  await sendMessage(queue, message);
}

export async function sendToDeleteAccount(message: string) {
  const queue = "Uploader-Drive-Account-delete";
  console.log("Account sent to Hard Delete: " + message);
  await sendMessage(queue, message);
}

export async function sendToDownload(message: string) {
  const queue = "Uploader-Downloader-create-file";
  console.log("File sent to Downloads: " + message);
  await sendMessage(queue, message);
}

export async function deleteOnDownload(message: string) {
  const queue = "Uploader-Downloader-delete-file";
  console.log("File to delete in Downloads: " + message);
  await sendMessage(queue, message);
}

export async function sendAccountToDownload(message: string) {
  const queue = "Uploader-Downloader-create-account";
  console.log("Account sent to delete on Downloader: " + message);
  await sendMessage(queue, message);
}

export async function deleteAccountOnDownload(message: string) {
  const queue = "Uploader-Downloader-delete-account";
  console.log("Account sent to Downloads: " + message);
  await sendMessage(queue, message);
}

export async function sendToSatus(message: string) {
  const queue = "Uploader-Stats";
  console.log("File sent to Status: " + message);
  await sendMessage(queue, message);
}

export async function receiveToUpload() {
  const channel = await connectToRabbitMq();
  const queueDrive = "Uploader-Drive";
  const queueAccountCreate = "Uploader-Drive-Account-create";
  const queueAccountDelete = "Uploader-Drive-Account-delete";

  channel.assertQueue(queueDrive, { durable: false });
  channel.assertQueue(queueAccountCreate, { durable: false });
  channel.assertQueue(queueAccountDelete, { durable: false });

  channel.consume(
    queueDrive,
    (msg) => {
      const message = JSON.parse(msg.content.toString());
      console.log("Received File to Upload to Drive: " + JSON.stringify(message));
      const fileService = new FileService()
      const point = new Point("file_upload")
        .tag("filename", message.filename)
        .floatField("size", message.size)
        .stringField("status", "Pending")
        .timestamp(new Date());
      const influxDbService = new InfluxDbService();
      influxDbService.writeApi.writePoints([point]);
      fileService.setupDriveUpload(message);;
    },
    {
      noAck: true,
    }
  );

  channel.consume(
    queueAccountCreate,
    (msg) => {
      const message = JSON.parse(msg.content.toString());
      console.log("Received Account to Upload files to Drive: " + JSON.stringify(message));
      const fileService = new FileService()
      fileService.setupNewAccountDriveUpload(message);
    },
    {
      noAck: true,
    }
  );

  channel.consume(
    queueAccountDelete,
    (msg) => {
      const message = JSON.parse(msg.content.toString());
      console.log("Received Account to Delete" + JSON.stringify(message));
      const googleDriveAccountService = new GoogleDriveAccountService()
      googleDriveAccountService.hardDelete(message.id);;
    },
    {
      noAck: true,
    }
  );
  console.log("Message Queue Service running on Uploader.");
}