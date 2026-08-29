const amqp = require("amqplib");
const inventoryService = require("../services/inventory.service");

async function startOrderConsumer() {

    const connection = await amqp.connect(process.env.RABBITMQ_URL);

    const channel = await connection.createChannel();

    await channel.assertQueue("order.created");

    channel.consume("order.created", async (msg) => {

        const order = JSON.parse(msg.content.toString());

        await inventoryService.reserveStock(
            order.productId,
            order.quantity
        );

        channel.ack(msg);

    });

}

module.exports = startOrderConsumer;