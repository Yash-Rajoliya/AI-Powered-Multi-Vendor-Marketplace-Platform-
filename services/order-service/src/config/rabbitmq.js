const amqp = require("amqplib");
const logger = require("../utils/logger");

let connection;
let channel;

const EXCHANGE = "marketplace.events";

async function connectRabbitMQ(){

try{

connection = await amqp.connect(process.env.RABBITMQ_URL);

channel = await connection.createChannel();

await channel.assertExchange(
EXCHANGE,
"topic",
{ durable:true }
);

logger.info("RabbitMQ connected");

connection.on("close",()=>{
logger.warn("RabbitMQ connection closed");
});

connection.on("error",(err)=>{
logger.error("RabbitMQ error",err);
});

}catch(error){

logger.error("RabbitMQ connection failed",error);
process.exit(1);

}

}

function getChannel(){

if(!channel){
throw new Error("RabbitMQ channel not initialized");
}

return channel;

}

module.exports = {
connectRabbitMQ,
getChannel
};