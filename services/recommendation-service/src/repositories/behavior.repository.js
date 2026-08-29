const Behavior = require("../models/userBehavior.model");

class BehaviorRepository{

async recordInteraction(data){
return Behavior.create(data);
}

async getUserInteractions(userId){
return Behavior.find({userId});
}

async getProductInteractions(productId){
return Behavior.find({productId});
}

async getAllInteractions(){
return Behavior.find({});
}

}

module.exports = new BehaviorRepository();