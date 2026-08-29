const Order = require("../models/order.model");

class OrderRepository {

async createOrder(data){
return Order.create(data);
}

async findByUser(userId){
return Order.find({ userId }).sort({ createdAt:-1 });
}

async findById(id){
return Order.findById(id);
}

async updateStatus(id,status){
return Order.findByIdAndUpdate(
id,
{ status },
{ new:true }
);
}

}

module.exports = new OrderRepository();