const {getChannel} = require("../config/rabbitmq");

async function publishInventoryEvent(key,payload){

const channel = getChannel();

channel.publish(
"marketplace.events",
key,
Buffer.from(JSON.stringify(payload)),
{persistent:true}
);

}

module.exports = {publishInventoryEvent};