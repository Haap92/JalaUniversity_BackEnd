import amqp from "amqplib/callback_api";

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

export async function statusListener() {
  const channel = await connectToRabbitMq();

  const queueUploader = "Uploader-Status";
  const queueDownloader = "Downloader-Status";

  await channel.assertQueue(queueUploader, { durable: false });
  await channel.assertQueue(queueDownloader, { durable: false });

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
}
