const mongoose = require("mongoose");
const logger = require("../utils/logger");

async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      autoIndex: true
    });

    logger.info("Recommendation Service MongoDB connected");
  } catch (error) {
    logger.error("MongoDB connection failed", error);
    process.exit(1);
  }
}

module.exports = connectDatabase;