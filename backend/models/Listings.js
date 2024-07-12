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
        type : String ,
        default :  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ,
        set : (v)=> v === "" ? "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v 
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

}) ; 



Listings.post("findOneAndDelete",async(listing)=>{
    if(listing.reviews.length){
        await review.deleteMany({_id : { $in : listing.reviews}})
    }

    console.log("All reviews has been deleted")

})

const listing = mongoose.model("listing",Listings) ;


export { listing } ;