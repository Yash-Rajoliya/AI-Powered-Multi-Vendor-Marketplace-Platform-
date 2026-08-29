const Joi = require("joi");

const createOrderSchema = Joi.object({

items:Joi.array().items(
Joi.object({
productId:Joi.string().required(),
vendorId:Joi.string().required(),
quantity:Joi.number().required(),
price:Joi.number().required()
})
),

totalAmount:Joi.number().required()

});

module.exports = {
createOrderSchema
};