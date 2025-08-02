import mongoose from "mongoose";

const connectMongoDB = async() =>{
    try {
        await mongoose.connect(process.env.URI_MONGODB);
        console.log("MongoDB connected!");
    } catch (error) {
        console.log("Couldn't connect to MongoDB");
    }
}

export default connectMongoDB;