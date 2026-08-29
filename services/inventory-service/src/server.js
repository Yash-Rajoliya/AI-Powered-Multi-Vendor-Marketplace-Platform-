require("dotenv").config();

const app = require("./app");

const connectDatabase = require("./config/database");
const {connectRabbitMQ} = require("./config/rabbitmq");

const startOrderConsumer = require("./events/order.consumer");
const startInventoryConsumer = require("./events/inventory.consumer");

const PORT = process.env.PORT || 4004;

async function startServer(){

await connectDatabase();

await connectRabbitMQ();

await startOrderConsumer();

await startInventoryConsumer();

app.listen(PORT,()=>{
console.log(`Inventory service running on ${PORT}`);
});

}

startServer();