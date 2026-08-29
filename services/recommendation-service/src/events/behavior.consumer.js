const amqp = require("amqplib");
const repository = require("../repositories/behavior.repository");
const constants = require("../constants/recommendation.constants");
const logger = require("../utils/logger");

async function startBehaviorConsumer() {

  const connection = await amqp.connect(process.env.RABBITMQ_URL);

  const channel = await connection.createChannel();

  await channel.assertQueue(constants.EVENTS.USER_BEHAVIOR);

  channel.consume(constants.EVENTS.USER_BEHAVIOR, async (msg) => {

    try {

      const event = JSON.parse(msg.content.toString());

      const interaction = {
        userId: event.userId,
        productId: event.productId,
        interactionType: event.type,
        weight: constants.INTERACTION_WEIGHTS[event.type] || 1
      };

      await repository.recordInteraction(interaction);

      logger.info("User behavior event processed");

      channel.ack(msg);

    } catch (error) {

      logger.error("Behavior consumer error", error);

      channel.nack(msg);
    }

  });

}

module.exports = startBehaviorConsumer;