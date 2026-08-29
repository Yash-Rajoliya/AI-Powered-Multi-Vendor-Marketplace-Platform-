const service = require("../services/recommendation.service");

class RecommendationController{

async getSimilarProducts(req,res,next){

try{

const products = await service.getSimilarProducts(
req.params.productId
);

res.json({
success:true,
data:products
});

}catch(err){next(err);}

}

async getRecommendedProducts(req,res,next){

try{

const products = await service.getRecommendedProducts(
req.params.userId
);

res.json({
success:true,
data:products
});

}catch(err){next(err);}

}

}

module.exports = new RecommendationController();