// Connection with DB 
import mongoose from "mongoose";
import { listing } from "../models/Listings.js";
const mongooseURL = 'mongodb://127.0.0.1:27017/Air'  ;

// Custom data
import { sampleListings } from "./data.js";


async function connectDB(){
    await mongoose.connect(mongooseURL) ;
}

connectDB().then(()=>{
    console.log("Connected To database")
})
.catch(()=>{
    console.log("Error Occur ! ") ;
})


async function initData(){

  try{
    await  listing.deleteMany({}) ;
    await  listing.insertMany(sampleListings) ;
    console.log("Data Set") ;
  }
  catch(error){
    console.log("Error " , error) ;
  }

}   

initData() ;





