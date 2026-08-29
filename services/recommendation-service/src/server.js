require("dotenv").config();

const app = require("./app");

const connectDatabase = require("./config/database");
const { connectRabbitMQ } = require("./config/rabbitmq");

const startBehaviorConsumer = require("./events/behavior.consumer");

const logger = require("./utils/logger");

const PORT = process.env.PORT || 4006;

let server;

async function startServer() {

  try {

    logger.info("Starting Recommendation Service...");

    /*
      Initialize Database
    */
    await connectDatabase();

    /*
      Initialize Messaging Layer
    */
    await connectRabbitMQ();

    /*
      Start Behavior Event Consumer
      Listens for user activity events
      like product views, clicks, purchases
    */
    await startBehaviorConsumer();

    /*
      Start HTTP Server
    */
    server = app.listen(PORT, () => {

      logger.info(`Recommendation Service running on port ${PORT}`);

    });

  } catch (error) {

    logger.error("Failed to start Recommendation Service", error);

    process.exit(1);

  }

}

/*
  Graceful shutdown
*/
async function shutdown() {

  logger.info("Shutting down Recommendation Service...");

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
  Start the service
*/
startServer();