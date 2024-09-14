import mongoose, { Schema } from "mongoose";
const userSchema=new Schema({
    fullName:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        index:true
    },
    userName:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    refreshToken:{
        type:String,
        
    },
},{timestamps:true})

export const User=mongoose.model('User',userSchema)