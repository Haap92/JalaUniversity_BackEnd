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

            const queue = 'Uploader_Status'
            const message = JSON.stringify({ fileName: 'archive.pdf', status: 'uploaded' });

            channel.assertQueue(queue, {
                durable: false
            });

            channel.sendToQueue(queue, Buffer.from(message));

            console.log('Message Sent: ' + message);
            
        })
    } 
)

