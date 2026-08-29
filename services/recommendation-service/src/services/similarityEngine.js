const repository = require("../repositories/behavior.repository");

class SimilarityEngine{

async getSimilarProducts(productId){

const interactions = await repository.getProductInteractions(productId);

const users = interactions.map(x=>x.userId.toString());

const all = await repository.getAllInteractions();

const scoreMap = {};

all.forEach(record=>{

if(users.includes(record.userId.toString()) 
&& record.productId.toString() !== productId){

const pid = record.productId.toString();

scoreMap[pid] = (scoreMap[pid] || 0) + record.weight;

}

});

return Object.entries(scoreMap)
.sort((a,b)=>b[1]-a[1])
.slice(0,10)
.map(x=>x[0]);

}

}

module.exports = new SimilarityEngine();