module.exports = {

ORDER_STATUS:{

PENDING:"pending",
PAID:"paid",
FAILED:"failed",
CANCELLED:"cancelled",
COMPLETED:"completed"

},

EVENTS:{

ORDER_CREATED:"order.created",
ORDER_UPDATED:"order.updated",
ORDER_CANCELLED:"order.cancelled",

PAYMENT_SUCCESS:"payment.success",
PAYMENT_FAILED:"payment.failed"

},

EXCHANGE:"marketplace.events"

};