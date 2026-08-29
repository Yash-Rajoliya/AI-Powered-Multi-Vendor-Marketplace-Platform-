const amqp = require("amqplib");
const logger = require("../utils/logger");

let channel;

const EXCHANGE = "marketplace.events";

async function connectRabbitMQ() {
    try {

        const connection = await amqp.connect(process.env.RABBITMQ_URL);

        channel = await connection.createChannel();

        await channel.assertExchange(EXCHANGE, "topic", {
            durable: true
        });

        logger.info("RabbitMQ connected for product events");

    } catch (error) {
        logger.error("RabbitMQ connection error", error);
    }
}

async function publishEvent(routingKey, payload) {

    if (!channel) {
        throw new Error("RabbitMQ channel not initialized");
    }

    channel.publish(
        EXCHANGE,
        routingKey,
        Buffer.from(JSON.stringify(payload)),
        { persistent: true }
    );

    logger.info(`Event published: ${routingKey}`);
}

module.exports = {
    connectRabbitMQ,
    publishEvent
};