const { getChannel } = require("../config/rabbitmq");
const logger = require("../utils/logger");

const EXCHANGE = "marketplace.events";

async function publishOrderCreated(order) {

  try {

    const channel = getChannel();

    const eventPayload = {
      event: "ORDER_CREATED",
      data: {
        orderId: order._id,
        userId: order.userId,
        items: order.items
      },
      timestamp: new Date()
    };

    channel.publish(
      EXCHANGE,
      "order.created",
      Buffer.from(JSON.stringify(eventPayload)),
      { persistent: true }
    );

    logger.info("ORDER_CREATED event published");

  } catch (error) {

    logger.error("Failed to publish ORDER_CREATED event", error);

  }

}

module.exports = {
  publishOrderCreated
};