const mongoose = require("mongoose");

const userBehaviorSchema = new mongoose.Schema({

userId:{
type:mongoose.Schema.Types.ObjectId,
required:true,
index:true
},

productId:{
type:mongoose.Schema.Types.ObjectId,
required:true
},

interactionType:{
type:String,
enum:["view","click","cart","purchase"],
required:true
},

weight:{
type:Number,
default:1
}

},{
timestamps:true
});

module.exports = mongoose.model("UserBehavior",userBehaviorSchema);