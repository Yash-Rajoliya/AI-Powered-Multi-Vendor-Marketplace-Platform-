const orderService = require("../services/order.service");

class OrderController {

async createOrder(req,res,next){

try{

const result =
await orderService.createOrder(req.body);

res.status(201).json({
success:true,
data:result
});

}catch(error){
next(error);
}

}

async getUserOrders(req,res,next){

try{

const orders =
await orderService.getUserOrders(req.user.id);

res.json({
success:true,
data:orders
});

}catch(error){
next(error);
}

}

}

module.exports = new OrderController();