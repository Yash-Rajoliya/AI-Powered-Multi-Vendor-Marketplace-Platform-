const { getChannel } = require("../config/rabbitmq");
const inventoryService = require("../services/inventory.service");
const logger = require("../utils/logger");

const EXCHANGE = "marketplace.events";
const QUEUE = "inventory.order.created";

async function startInventoryConsumer() {

  try {

    const channel = getChannel();

    await channel.assertExchange(EXCHANGE, "topic", { durable: true });

    const q = await channel.assertQueue(QUEUE, { durable: true });

    await channel.bindQueue(q.queue, EXCHANGE, "order.created");

    logger.info("Inventory consumer started");

    channel.consume(q.queue, async (msg) => {

      if (!msg) return;

      try {

        const event = JSON.parse(msg.content.toString());

        if (event.event === "ORDER_CREATED") {

          const items = event.data.items;

          for (const item of items) {

            await inventoryService.reduceStock(
              item.productId,
              item.quantity
            );

          }

          logger.info("Inventory updated after order");

        }

        channel.ack(msg);

      } catch (error) {

        logger.error("Inventory consumer error", error);

        channel.nack(msg);

      }

    });

  } catch (error) {

    logger.error("Failed to start inventory consumer", error);

  }

}

module.exports = startInventoryConsumer;