import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:String,
    price:Number,
    stock:Number,
    status: {type:Boolean, default:true},
    createdAt: {type:Date, default:Date.now()}
});

const ProductSchema = mongoose.model("Product", productSchema);

export default ProductSchema