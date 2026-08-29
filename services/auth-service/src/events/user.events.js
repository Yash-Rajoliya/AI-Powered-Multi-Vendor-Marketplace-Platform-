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

        logger.info("RabbitMQ connected for user events");

    } catch (error) {

        logger.error("RabbitMQ connection failed", error);

        process.exit(1);
    }
}

async function publishUserEvent(routingKey, payload) {

    if (!channel) {
        throw new Error("RabbitMQ channel not initialized");
    }

    channel.publish(
        EXCHANGE,
        routingKey,
        Buffer.from(JSON.stringify(payload)),
        { persistent: true }
    );

    logger.info(`User event published: ${routingKey}`);
}

module.exports = {
    connectRabbitMQ,
    publishUserEvent
};