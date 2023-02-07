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

        connection.createChannel((error1, channel) => {
            if (error1) {
              throw error1;
            }
        
            channel.assertExchange('topic_example', 'topic', {
              durable: false
            });
        
            const routingKey = 'example.message';
            const message = 'This is an example message';
        
            channel.publish('topic_example', routingKey, Buffer.from(message));
            console.log(`[x] Sending ${routingKey}: ${message}`);
        
            setTimeout(() => {
                connection.close();
                process.exit(0);
            }, 500);
          });
    })