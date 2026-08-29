const orderRepository = require("../repositories/order.repository");
const paymentService = require("./payment.service");
const orderCache = require("../cache/order.cache");
const { publishOrderEvent } = require("../events/order.publisher");
const { NotFoundError } = require("../utils/errors");

class OrderService {

async createOrder(data){

const order = await orderRepository.createOrder(data);

const paymentIntent =
await paymentService.createPaymentIntent(order);

order.paymentIntentId = paymentIntent.id;

await order.save();

await publishOrderEvent("order.created", order);

return {
order,
paymentIntent
};

}

async getUserOrders(userId){

const cached = await orderCache.get(userId);

if(cached) return cached;

const orders = await orderRepository.findByUser(userId);

await orderCache.set(userId,orders);

return orders;

}

async updateOrderStatus(orderId,status){

const order =
await orderRepository.updateStatus(orderId,status);

if(!order) throw new NotFoundError("Order not found");

await publishOrderEvent("order.updated",order);

return order;

}

}

module.exports = new OrderService();