import dbConnect from "./db/database.js";
import dotenv from "dotenv"
import { app } from "./app.js";
dotenv.config({
    path:"./.env"
})
const port=process.env.PORT||9000
dbConnect()
.then(()=>{
    app.listen(port,()=>{
        console.log(`port is running on ${port}`)
    })
})
.catch((err)=>{
    console.log("connection error",err)
})