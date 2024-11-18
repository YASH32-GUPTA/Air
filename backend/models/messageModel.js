import mongoose from "mongoose";


main().then(()=>console.log("Database connected - messageModel")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Air');
}


const messageSchema = mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "user" ,
        required : true 

    } ,
    receiverId : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "user",
        required : true 

    } ,
    message : {
        type : String ,
        required : true 
    }

},{timestamps : true })

const messageModel = mongoose.model("message",messageSchema) ;

export {messageModel} ;