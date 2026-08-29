const Joi = require("joi");

const updateStockSchema = Joi.object({

quantity:Joi.number()
.required()
.min(1)

});

const reserveStockSchema = Joi.object({

productId:Joi.string().required(),

quantity:Joi.number()
.required()
.min(1)

});

module.exports = {
updateStockSchema,
reserveStockSchema
};