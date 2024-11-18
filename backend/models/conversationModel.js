import mongoose from "mongoose";

main().then(()=>console.log("Database connected - conversation Schema")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Air');
}


const conversationSchema = mongoose.Schema({
    participants : [{
        type : mongoose.Schema.Types.ObjectId , 
        ref : "user"
    }]
    ,

    messages : [{
        type : mongoose.Schema.Types.ObjectId , 
        ref : "message" 
    }]

}) ;

const conversation = mongoose.model("conversation",conversationSchema) ;

export { conversation } ; 