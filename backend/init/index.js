// Connection with DB 
import mongoose from "mongoose";
import { listing } from "../models/Listings.js";
const mongooseURL = 'mongodb://127.0.0.1:27017/Air'  ;

// Custom data
import { sampleListings } from "./data.js";
import { user } from "../models/user.js";


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
    let allData = await listing.find();
    allData.map(async (data)=>{
      data.owner = await user.findById("66915218b7eabed9ce6f760e")
    })
    await  listing.deleteMany({}) ;
    await  listing.insertMany(allData) ;

    
    
    console.log("Data Set") ;
  }
  catch(error){
    console.log("Error " , error) ;
  }

}   

initData() ;





