import mongoose from "mongoose";


export async function connectToMongoDB(){
    return await mongoose.connect(process.env.DATABASE_URL);
}