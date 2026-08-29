const amqp = require("amqplib");
const logger = require("../utils/logger");

let channel;

const EXCHANGE = "marketplace.events";

async function connectRabbitMQ() {

    const connection = await amqp.connect(process.env.RABBITMQ_URL);

    channel = await connection.createChannel();

    await channel.assertExchange(EXCHANGE, "topic", {
        durable: true
    });

    logger.info("Vendor service connected to RabbitMQ");

}

async function publishVendorEvent(key, payload) {

    if (!channel) throw new Error("RabbitMQ not initialized");

    channel.publish(
        EXCHANGE,
        key,
        Buffer.from(JSON.stringify(payload)),
        { persistent: true }
    );

}

module.exports = {
    connectRabbitMQ,
    publishVendorEvent
};