import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app=express()

app.use(cors({
    origin: 'https://reviews-coral.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from './routes/routes.js'
app.use('/api/users',userRouter)
export {app}