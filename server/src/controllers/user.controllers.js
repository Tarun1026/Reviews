import {asyncHanlder} from '../utils/asynchandler.js'
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { Review } from '../models/Review.model.js';
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

const logOutUser=asyncHanlder(async(req,res)=>{
    console.log("helo")
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken:undefined
            }
        },
        {
            new:true
        } 
    )
    const options={
        httpOnly:true,
        secure:true
    }

    return res.
    status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new ApiResponse(200,{},"User Logout Successfully")
    )
})

const refreshAccessToken=asyncHanlder(async(req,res)=>{
    try {
        const incomingRefreshToken=req.cookies.refreshToken || 
        req.body.refreshToken
    
        if(!incomingRefreshToken){
            throw new ApiError(401,"Invalid IncomingRefresh Token")
        }
    
        const decodedToken=jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user= await User.findById(decodedToken?._id)
        if(!user){
            throw new ApiError(401,"Unauthorized Token Access")
        }
    
        if(incomingRefreshToken!==user?.refreshToken){
            throw new ApiError(400,"Refresh Token Not Matched")
        }
    
        const options={
            httpOnly:true,
            secure:true
        }
    
        const{accessToken,newRefreshToken}=await generateAccessAndRefreshToken(user._id)
    
        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",newRefreshToken,options)
        .json(
            new ApiResponse(
                200,{
                    accessToken,refreshToken:newRefreshToken
                },
                "Access Token Refreshed"
                
            )
        )
    } catch (error) {
        throw new ApiError(400,error?.message||"Invalid Token access")
    }
})
const userReview = asyncHanlder(async (req, res) => {
    const { reviewText, movieId, movieTitle } = req.body;
    
    if (reviewText === "") {
        throw new ApiError("Review should not be empty");
    }
    if (movieId === "") {
        throw new ApiError("movieId missing");
    }
    if (movieTitle === "") {
        throw new ApiError("movie Title missing");
    }

    // Find the existing review document for the given movieId
    let movieReview = await Review.findOne({ movieId });

    if (!movieReview) {
        // If it doesn't exist, create a new document
        movieReview = await Review.create({
            movieId,
            movieTitle,
            reviews: [{
                reviewText,
                username: req.user?.username // Get username from request
            }]
        });
    } else {
        // If it exists, push the new review into the reviews array
        movieReview.reviews.push({
            reviewText,
            username: req.user?.username // Get username from request
        });
        await movieReview.save(); // Save the updated document
    }
    //  console.log("req user",req.user)
    const userFind = await User.findById(req.user._id);
if (!userFind) {
    throw new ApiError(404, "User not found");
}

// Create the new review object
    const newReview = {
        movieId,
        movieTitle,
        reviewText,
    };

    // Check if userReviews exists, if not, initialize it as an array
    if (userFind.userReviews && Array.isArray(userFind.userReviews)) {
        userFind.userReviews.push(newReview);
    } else {
        // Initialize userReviews as an array with the new review
        userFind.userReviews = [newReview];
    }

    // Save the updated user document
    await userFind.save();

    // Log the updated user data
    console.log("user data", userFind);

    return res.status(200).json(
        new ApiResponse(200, {movieReview,userFind}, "Review Sent Successfully")
    );
});

const getUserDetails=asyncHanlder(async(req,res)=>{
    // console.log("req",req.user)
    // console.log("call")
    if (!req.user) {
        return res.status(404).json({ message: "User not found" });
      }
    res.status(200)
    .json(
      new ApiResponse(
        200,req.user,"Current User Fetched"
      )
    )
  })

const getMovieReviews=asyncHanlder(async(req,res)=>{
    const{movieId}=req.body
    // console.log("movieId",movieId)
    const movie=await Review.findOne({movieId})
    // console.log("mo",movie)
    if (movie){
        res
        .status(200)
        .json(
            new ApiResponse(200,movie.reviews,"Reviews Fetched")
        )
    }
    else{
        res
        .status(200)
        .json(
            new ApiResponse(200,{},"Reviews Fetched")
        )
    }
})

const updateUserName=asyncHanlder(async(req,res)=>{
    console.log("rew",req.body)
    const {payload}=req.body
    console.log("paylo",payload.username)
    const findUser=payload.username
    const user=await User.findOne({findUser})
    // console.log("us",user)
    if(user){
       throw new ApiError(401,"This UserName already exist")
    }
    const setUser=await User.findById(req.user._id)
    setUser.username=payload.username
    await setUser.save({validateBeforeSave:false})
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            setUser,
            "data  update successfully"
        )
    )

})

const updateEmail=asyncHanlder(async(req,res)=>{
    const {payload}=req.body
    const email=payload.email
    const user=await User.findOne({email})
    if(user){
        throw new ApiError("This Email already exist")
    }
    const setEmail=await User.findById(req.user._id)
    setEmail.email=payload.email
    await setEmail.save({validateBeforeSave:false})
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            setEmail,
            "Email  update successfully"
        )
    )

})

const updatePassword=asyncHanlder(async(req,res)=>{
    const{payload}=req.body
    const oldPassword=payload.oldPassword
    const newPassword=payload.newPassword
    const user=await User.findById(req.user._id)
    if(!user){
        throw new ApiError(404,"User not found")
    }
    const matchPassword= await user.isPasswordCorrect(oldPassword)
    if(!matchPassword){
        throw new ApiError(401,"old password not correct")
    
      }
    user.password=newPassword
    await user.save({validateBeforeSave:true})
  
    return res
    .status(200)
    .json(
      new ApiResponse(200
        ,{},"Password Change Successfully"
      )
    )
    
 
})
export {userRegister,
        loginUser,
        logOutUser,
        generateAccessAndRefreshToken,
        refreshAccessToken,
        userReview,
        getUserDetails,
    getMovieReviews,
     updateUserName,
     updateEmail,
    updatePassword}