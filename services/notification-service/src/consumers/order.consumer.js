const notificationService = require("../services/notification.service");
const logger = require("../utils/logger");

const MAX_RETRIES = 3;

async function handleOrderCreatedEvent(channel, message) {
  if (!message) return;

  const content = JSON.parse(message.content.toString());
  const properties = message.properties || {};
  const headers = properties.headers || {};
  const retryCount = (headers["x-retry-count"] || 0);

  try {
    await notificationService.sendOrderConfirmation(content);
    channel.ack(message);
    logger.info?.(`Order confirmation sent for order: ${content.orderId}`);
  } catch (error) {
    logger.error?.(`Failed to send notification for order ${content.orderId}:`, error);

    if (retryCount < MAX_RETRIES) {
      // Re-queue with incremented retry header
      channel.ack(message);
      channel.publish(
        properties.exchange || "",
        properties.routingKey || "order.created",
        message.content,
        {
          ...properties,
          headers: {
            ...headers,
            "x-retry-count": retryCount + 1,
          },
        }
      );
    } else {
      logger.error?.(`Max retries reached for order ${content.orderId}. Dead-lettering message.`);
      channel.nack(message, false, false); // Route to Dead Letter Queue (DLQ)
    }
  }
}

module.exports = { handleOrderCreatedEvent };