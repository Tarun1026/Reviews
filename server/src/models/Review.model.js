import mongoose,{Schema} from "mongoose";

const reviewSchema=new Schema({
    
        reviewText: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
   
    movieId:{
        type:Number
    },
    movieTitle:{
        type:String
    },
    profileImage:{
        type:String
    }
    // username:{
    //     type:String,
    //     required:true
    // }
//     rating:{
//         type:Number,
//         required:true
//     }
},{timestamps:true})

export const Review=mongoose.model('Review',reviewSchema)