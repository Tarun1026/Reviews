import {asyncHanlder} from '../utils/asynchandler.js'
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const generateAccessAndRefreshToken=async(userId)=>{
    const user=await User.findById(userId)
    if(!user){
        throw new ApiError(401,"User not found")
    }
    const accessToken=user.generateAccessToken()
    const refreshToken=user.generateRefreshToken()
    user.refreshToken=refreshToken
    await user.save({validateBeforeSave:false})

    return {accessToken,refreshToken}
}

const userRegister=asyncHanlder(async(req,res)=>{
    console.log('Request Body:', req.body);
    const {username,email,password}=req.body

    if([username,email,password].some((field)=>field?.trim==""))
        {
            throw new ApiError(400,"All field are required")
        }
    const existedEmail=await User.findOne({
        email:email
    })
    if (existedEmail){
        throw new ApiError(401,"User already Exist")
    }
    const existedUserName=await User.findOne({
        username:username
    })
    if (existedUserName){
        throw new ApiError(401,"Username already occupied")
    }
    const createUser=await User.create({
        username:username.toLowerCase(),
        email,
        password
    })
if(!createUser){
    throw new ApiError("Something wrong while creating account,Please retry after sometime")
}
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,createUser,"User Register Successfully"
        )
    )
})
const options={
    httpOnly:true,
    secure:true
}
const loginUser=asyncHanlder(async(req,res)=>{
    const {email,password}=req.body
    const user=await User.findOne({
        email:email
    })
    if(!user){
        throw new ApiError(401,"User not found")
    }
    const passwordCheck=await user.isPasswordCorrect(password)
    if(!passwordCheck){
        throw new ApiError(401,"Password is wrong")
    }

    const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id)

    if (!accessToken|| !refreshToken){
        throw new ApiError(500,"Failed to generate Tokens")
    }

    const loggedIn=await User.findById(user._id).select("-password -refreshToken")

     return res
     .status(200)
     .cookie("accessToken",accessToken,options)
     .cookie("refreshToken",refreshToken,options)
     .json(
        new ApiResponse(
            200,
            {
                user:accessToken,refreshToken,loggedIn
            },
            "User Login Successfully"
        )
     )
})
export {userRegister,loginUser,generateAccessAndRefreshToken}