import mongoose from "mongoose";
import Product from "../models/product.model.js";

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.URI_MONGODB);
        await Product.syncIndexes();
        console.log("MongoDB connected!");
    } catch (error) {
        console.log("Couldn't connect to MongoDB");
    }
};

export default connectMongoDB;
