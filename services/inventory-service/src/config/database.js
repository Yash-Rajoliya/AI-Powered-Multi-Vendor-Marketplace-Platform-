const mongoose = require("mongoose");
const logger = require("../utils/logger");

async function connectDatabase(){

try{

await mongoose.connect(process.env.MONGO_URI);

logger.info("MongoDB connected");

}catch(err){

logger.error("MongoDB connection failed",err);
process.exit(1);

}

}

module.exports = connectDatabase;