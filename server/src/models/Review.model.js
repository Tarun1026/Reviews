import mongoose,{Schema} from "mongoose";

const reviewSchema=new Schema({
    review:{
        type:String,
        
    },
    rating:{
        type:Number,
        required:true
    }
})

export const Review=mongoose.model('Review',reviewSchema)