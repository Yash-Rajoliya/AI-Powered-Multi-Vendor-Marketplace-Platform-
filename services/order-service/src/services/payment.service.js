const stripe = require("../integrations/stripe.client");

class PaymentService {

async createPaymentIntent(order){

const paymentIntent = await stripe.paymentIntents.create({

amount: Math.round(order.totalAmount * 100),
currency: order.currency,
metadata: {
orderId: order._id.toString()
}

});

return paymentIntent;

}

}

module.exports = new PaymentService();