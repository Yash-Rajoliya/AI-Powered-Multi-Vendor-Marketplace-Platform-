const orderRepository = require("../repositories/order.repository");
const paymentService = require("./payment.service");
const orderCache = require("../cache/order.cache");
const { publishOrderEvent } = require("../events/order.publisher");
const { NotFoundError } = require("../utils/errors");

class OrderService {

    async createOrder(data) {
        let order = null;

        try {
            // 1. Create initial order record
            order = await orderRepository.createOrder(data);

            // 2. Generate payment intent via external payment service
            const paymentIntent = await paymentService.createPaymentIntent(order);

            // 3. Attach paymentIntentId and update status via repository
            order = await orderRepository.updateStatus(order._id, order.status, {
                paymentIntentId: paymentIntent.id
            });

            // 4. Invalidate cache & publish event
            if (order.userId) {
                await orderCache.del(order.userId.toString());
            }

            await publishOrderEvent("order.created", order);

            return {
                order,
                paymentIntent
            };

        } catch (error) {
            // Handle partial failure: mark created order as failed if payment intent generation fails
            if (order && order._id) {
                try {
                    await orderRepository.updateStatus(order._id, "failed");
                } catch (rollbackErr) {
                    console.error("Failed to update order status to failed during rollback:", rollbackErr);
                }
            }

            throw error;
        }
    }

    async getUserOrders(userId) {
        const cached = await orderCache.get(userId);

        if (cached) return cached;

        const orders = await orderRepository.findByUser(userId);

        await orderCache.set(userId, orders);

        return orders;
    }

    async updateOrderStatus(orderId, status) {
        const order = await orderRepository.updateStatus(orderId, status);

        if (!order) throw new NotFoundError("Order not found");

        // Invalidate user orders cache on status mutation
        if (order.userId) {
            await orderCache.del(order.userId.toString());
        }

        await publishOrderEvent("order.updated", order);

        return order;
    }

}

module.exports = new OrderService();