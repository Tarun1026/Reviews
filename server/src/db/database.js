import mongoose from "mongoose";
import { dbName } from "../constant.js";
import dotenv from "dotenv"

dotenv.config()
const dbConnect=async()=>{
    try {
        const connectInstance=await mongoose.connect(
            `${process.env.MONGODB_URL}/${dbName}`
        )
        console.log("Mongodb connected",connectInstance.connection.host)
    } catch (error) {
        console.log("Mongodb Connection Error",error)
    }
}
export default dbConnect