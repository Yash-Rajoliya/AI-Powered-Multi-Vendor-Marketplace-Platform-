const service = require("../services/inventory.service");

class InventoryController{

async updateStock(req,res,next){

try{

const data = await service.updateStock(
req.params.productId,
req.body.quantity
);

res.json({
success:true,
data
});

}catch(err){next(err);}

}

async checkStock(req,res,next){

try{

const data = await service.checkStock(
req.params.productId
);

res.json({
success:true,
data
});

}catch(err){next(err);}

}

async reserveInventory(req,res,next){

try{

const data = await service.reserveInventory(
req.body.productId,
req.body.quantity
);

res.json({
success:true,
data
});

}catch(err){next(err);}

}

}

module.exports = new InventoryController();