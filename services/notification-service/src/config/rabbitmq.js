const amqp = require("amqplib");
const logger = require("../utils/logger");

let channel;

async function connectRabbitMQ() {

  try {

    const connection = await amqp.connect(process.env.RABBITMQ_URL);

    channel = await connection.createChannel();

    await channel.assertExchange(
      "marketplace.events",
      "topic",
      { durable: true }
    );

    logger.info("RabbitMQ connected for notification service");

  } catch (error) {

    logger.error("RabbitMQ connection failed", error);
    throw error;

  }

}

function getChannel() {
  return channel;
}

module.exports = {
  connectRabbitMQ,
  getChannel
};