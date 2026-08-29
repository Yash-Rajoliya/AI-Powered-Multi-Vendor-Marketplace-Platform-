function generateEmail(order) {

return `
<h2>Order Confirmed</h2>

<p>Order ID: ${order.orderId}</p>

<p>Total: $${order.totalAmount}</p>

<p>Thank you for shopping with us.</p>
`;

}

function generateSMS(order) {

return `Order ${order.orderId} confirmed. Total: $${order.totalAmount}`;

}

module.exports = {
generateEmail,
generateSMS
};