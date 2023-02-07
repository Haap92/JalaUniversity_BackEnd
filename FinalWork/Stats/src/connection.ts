import amqp = require('amqplib/callback_api');

amqp.connect(
    {
        protocol: 'amqp',
        hostname: 'localhost',
        port: 5672,
        username: 'haap',
        password: 'microservices'
    }, function (error0, connection) {
        if(error0) {
            throw error0
        }

        connection.createChannel(function(error1, channel){
            if(error1) {
                throw error1
            }

            const queueUploader = 'Uploader_Status'

            const queueDownloader = 'Downloader_Status'

            channel.assertQueue(queueUploader, {
                durable: false
            });

            channel.assertQueue(queueDownloader, {
                durable: false
            });

            channel.consume(queueUploader, (message) => {
            const receivedMessage = JSON.parse(message!.content.toString());
            console.log(`File "${receivedMessage.fileName}" has been ${receivedMessage.status}.`);
          }, { noAck: true });

            channel.consume(queueDownloader, (message) => {
            const receivedMessage = JSON.parse(message!.content.toString());
            console.log(`File "${receivedMessage.fileName}" has been ${receivedMessage.status}.`);
          }, { noAck: true });
        })   
    }
)
