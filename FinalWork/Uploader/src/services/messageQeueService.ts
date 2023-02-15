import amqp = require("amqplib/callback_api");
import FileService from "./fileService";

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

export async function sendToUpload(message: string) {
  const queue = "Uploader-Drive";
  await sendMessage(queue, message);
}

export async function sendToDownload(message: string) {
  const queue = "Uploader-Downloader";
  await sendMessage(queue, message);
}

export async function sendToSatus(message: string) {
  const queue = "Uploader-Status";
  await sendMessage(queue, message);
}

export async function receiveToUpload() {
  const channel = await connectToRabbitMq();
  const queue = "Uploader-Drive";

  channel.assertQueue(queue, { durable: false });

  channel.consume(
    queue,
    (msg) => {
      const message = JSON.parse(msg.content.toString());
      console.log("Received message: " + JSON.stringify(message));
      const fileService = new FileService()
      fileService.setupDriveUpload(message);;
    },
    {
      noAck: true,
    }
  );

  console.log("Waiting for messages...");
}