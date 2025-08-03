import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, index: "test", required: true },
    code: { type: Number, unique: true, required: true },
    category: { type: String, index: true, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    status: { type: Boolean, default: true },
    thumbnails: { type: Array, default: [] },
    createdAt: { type: Date, default: Date.now },
});

productSchema.plugin(paginate);

const Product = mongoose.model("products", productSchema);

export default Product;
