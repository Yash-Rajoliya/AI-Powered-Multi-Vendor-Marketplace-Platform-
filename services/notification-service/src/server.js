require("dotenv").config();

const app = require("./app");

const { connectRabbitMQ } = require("./config/rabbitmq");
const redisClient = require("./config/redis");

const startNotificationConsumer = require("./events/notification.consumer");

const logger = require("./utils/logger");

const PORT = process.env.PORT || 4010;

let server;

async function startServer() {

  try {

    logger.info("Starting Notification Service...");

    /*
      Initialize Redis
    */
    if (redisClient) {
      logger.info("Redis initialized");
    }

    /*
      Initialize RabbitMQ
    */
    await connectRabbitMQ();

    /*
      Start Notification Consumer
      Listens for events like:
      order.confirmed
      order.shipped
    */
    await startNotificationConsumer();

    /*
      Start HTTP Server
    */
    server = app.listen(PORT, () => {
      logger.info(`Notification Service running on port ${PORT}`);
    });

  } catch (error) {

    logger.error("Failed to start Notification Service", error);

    process.exit(1);

  }

}

/*
Graceful Shutdown
*/
async function shutdown() {

  logger.info("Shutting down Notification Service...");

  if (server) {

    server.close(() => {

      logger.info("HTTP server closed");

      process.exit(0);

    });

  }

}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

/*
Start service
*/
startServer();