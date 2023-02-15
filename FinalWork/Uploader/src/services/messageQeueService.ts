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

export async function sendToDownload(message: string) {
  const queue = "Uploader-Downloader";
  console.log("File sent to Downloads: " + message);
  await sendMessage(queue, message);
}

export async function sendToSatus(message: string) {
  const queue = "Uploader-Status";
  console.log("File sent to Status: " + message);
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
      console.log("Received File to Upload to Drive: " + JSON.stringify(message));
      const fileService = new FileService()
      fileService.setupDriveUpload(message);;
    },
    {
      noAck: true,
    }
  );
  console.log("Message Queue Service running on Uploader.");
}