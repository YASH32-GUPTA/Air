import mongoose, { Schema, set } from "mongoose";
import { review } from "./Review.js";

const Listings = new mongoose.Schema({
    title : {
        type : String ,
        required : true 
    }
    , 
    description : {
        type : String , 
    }
    ,
    image : {
        url : String ,  
        filename : String 
    }
    , 
    price : {
        type : Number 
    }
    ,
    location : {
        type : String 
    }
    ,
    country : {
        type : String ,
    }
    ,
    reviews : [
        {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "review"
        }
    ]
    ,
    owner : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "user"
    }
    ,
    category  : {
        type : String , 
        required : true 
    }

}) ; 



Listings.post("findOneAndDelete",async(listing)=>{
    if(listing.reviews.length){
        await review.deleteMany({_id : { $in : listing.reviews}})
    }

    console.log("All reviews has been deleted")

})

const listing = mongoose.model("listing",Listings) ;


export { listing } ;