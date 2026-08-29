const amqp = require("amqplib");
const orderRepository = require("../repositories/order.repository");

async function startPaymentConsumer(){

const connection =
await amqp.connect(process.env.RABBITMQ_URL);

const channel =
await connection.createChannel();

await channel.assertQueue("payment.completed");

channel.consume("payment.completed",async(msg)=>{

const event =
JSON.parse(msg.content.toString());

await orderRepository.updateStatus(
event.orderId,
"paid"
);

channel.ack(msg);

});

}

module.exports = startPaymentConsumer;