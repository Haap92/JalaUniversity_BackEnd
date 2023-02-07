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
            throw error0;
        }
        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }
        
            channel.assertExchange('topic_example', 'topic', {
              durable: false
            });
        
            channel.assertQueue('', { exclusive: true }, (error3, q) => {
              if (error3) {
                console.error(error3);
                return;
              }
        
              channel.bindQueue(q.queue, 'topic_example', 'example.*');
        
              console.log('Waiting for messages. To exit press CTR-C');
        
              channel.consume(q.queue, (msg) => {
                console.log(`[x] Received: ${msg!.content.toString()}`);
              }, { noAck: true });
            });
          });
        });