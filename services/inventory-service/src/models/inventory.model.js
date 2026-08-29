const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
{
productId:{
type:mongoose.Schema.Types.ObjectId,
required:true,
index:true
},

vendorId:{
type:mongoose.Schema.Types.ObjectId,
required:true
},

totalStock:{
type:Number,
required:true,
min:0
},

reservedStock:{
type:Number,
default:0
},

lowStockThreshold:{
type:Number,
default:5
}

},
{timestamps:true}
);

inventorySchema.virtual("availableStock").get(function(){
return this.totalStock - this.reservedStock;
});

module.exports = mongoose.model("Inventory",inventorySchema);