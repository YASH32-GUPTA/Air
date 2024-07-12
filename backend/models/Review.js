import mongoose, { set } from "mongoose";

main().then(()=>console.log("Database connected - Review")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Air');
}

const reviewSchema = new mongoose.Schema({
    comment : String , 

    rating : {
        type : Number , 
        min : 1 , 
        max : 5 
    }   
    , 
    createdAt : {
        type: Date , 
        default : Date.now() 
    }
    ,
    author : {
        type  : mongoose.Schema.Types.ObjectId ,
        ref : "user" 
    }
})

const review = mongoose.model("review",reviewSchema) ; 

export { review } ;  



