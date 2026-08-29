const amqp = require("amqplib");

let channel;

async function connectRabbitMQ(){

const connection =
await amqp.connect(process.env.RABBITMQ_URL);

channel = await connection.createChannel();

await channel.assertExchange(
"marketplace.events",
"topic",
{durable:true}
);

}

function getChannel(){
return channel;
}

module.exports = {
connectRabbitMQ,
getChannel
};