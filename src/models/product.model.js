import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: Number, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    status: { type: Boolean, default: true },
    thumbnails: { type: Array, default: [] },
    createdAt: { type: Date, default: Date.now }
});


const Product = mongoose.model("products", productSchema);

export default Product