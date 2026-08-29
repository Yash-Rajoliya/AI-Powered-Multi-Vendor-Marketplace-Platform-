const amqp = require("amqplib");
const notificationService = require("../services/notification.service");
const logger = require("../utils/logger");

async function startNotificationConsumer() {

  const connection = await amqp.connect(process.env.RABBITMQ_URL);

  const channel = await connection.createChannel();

  await channel.assertQueue("order.confirmed");

  channel.consume("order.confirmed", async (msg) => {

    try {

      const data = JSON.parse(msg.content.toString());

      await notificationService.sendOrderConfirmation(data);

      channel.ack(msg);

      logger.info("Order confirmation notification sent");

    } catch (error) {

      logger.error("Notification processing failed", error);

      channel.nack(msg);

    }

  });

}

module.exports = startNotificationConsumer;