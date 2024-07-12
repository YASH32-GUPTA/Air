  import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose'

main().then(()=>console.log("Database connected - User")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Air');
}


const userSchema = new mongoose.Schema({
    email :{
        type : String ,
        required : true 
    }
}) ; 


userSchema.plugin(passportLocalMongoose) ;

const user = mongoose.model("user",userSchema) ; 

export {user} ;