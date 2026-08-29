const Inventory = require("../models/inventory.model");

class InventoryRepository{

async create(data){
return Inventory.create(data);
}

async findByProduct(productId){
return Inventory.findOne({productId});
}

async updateStock(productId,quantity){

return Inventory.findOneAndUpdate(
{productId},
{$inc:{totalStock:quantity}},
{new:true}
);

}

async reserveStock(productId,quantity){

return Inventory.findOneAndUpdate(
{
productId,
$expr:{
$gte:[
{$subtract:["$totalStock","$reservedStock"]},
quantity
]
}
},
{$inc:{reservedStock:quantity}},
{new:true}
);

}

}

module.exports = new InventoryRepository();