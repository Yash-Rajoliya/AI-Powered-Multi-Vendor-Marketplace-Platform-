const repository = require("../repositories/behavior.repository");

class CollaborativeFiltering{

async getUserSimilarityMatrix(){

const interactions = await repository.getAllInteractions();

const matrix = {};

interactions.forEach(({userId,productId})=>{

if(!matrix[userId]) matrix[userId]=[];

matrix[userId].push(productId.toString());

});

return matrix;

}

async getSimilarUsers(userId){

const matrix = await this.getUserSimilarityMatrix();

const target = matrix[userId] || [];

const similarityScores = {};

Object.keys(matrix).forEach(user=>{

if(user===userId) return;

const overlap = matrix[user].filter(p=>target.includes(p));

similarityScores[user] = overlap.length;

});

return Object.entries(similarityScores)
.sort((a,b)=>b[1]-a[1])
.slice(0,5)
.map(x=>x[0]);

}

}

module.exports = new CollaborativeFiltering();