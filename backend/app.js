// env 
import dotenv from 'dotenv' ;
import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import bodyParser from 'body-parser';
// Schema
import { listing } from './models/Listings.js';
import { ListingSchema ,ReviewSchema } from './utils/ValidationSchema.js';
import { review } from './models/Review.js'
import { messageModel } from './models/messageModel.js';
import { conversation } from './models/conversationModel.js';


// Session 
import session from 'express-session';

// Error handlers 
import { asyncWrap } from './utils/AysncWrap.js';
import { ExpressError } from './utils/ExpressErrror.js';



// Keys
if( process.env.NODE_ENV  != "production"){
    dotenv.config() ;
}



// Authentication 
import passport from 'passport';
import LocalStrategy from 'passport-local'
import { user } from './models/user.js'; 

// Socket 
import { io ,server ,app,getReceiverSocketId} from './socket/socket.js';


// APP WORK 
const port = process.env.PORT ; 

// Session options
const sessionOptions = {
    secret: 'mysupersecretcode',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        // Add `secure: true` if using HTTPS
    }
};

// Use session middleware
app.use(session(sessionOptions));
// Initialize Passport and use session
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(user.authenticate())) ;
passport.serializeUser(user.serializeUser()) ;
passport.deserializeUser(user.deserializeUser()) ;



app.use(bodyParser.json()) ;
// Convert Incoming Data to readable format . 
app.use(express.urlencoded({extended:true})) ;



// DATABASE CONNECT 
const mongooseURL = 'mongodb://127.0.0.1:27017/Air' ; 


async function connectDB(){ 
    await mongoose.connect(mongooseURL) ;
}

connectDB().then(()=>{
    console.log("DB CONNECTED") ;
})
.catch((error)=>{
    console.log("Error",error) ;
})







// Validate Add Middleware 
async function ValidateData(req , res, next ){
    // JOI VALIDATION
    const response = ListingSchema.validate({ listing : {...req.body}}, { abortEarly: false });
        
    if (response.error) {
        return next( new ExpressError(404 ,  response.error.message))
    }
    else{
        next() ;
    }   
}
// Validate Review Middleware 
async function ValidateReview(req ,res,next){
      console.log({ review : {...req.body}}) ;
      // JOI VALIDATION
      const response = ReviewSchema.validate({ review : {...req.body}}, { abortEarly: false });
        
      if (response.error) {
          return next( new ExpressError(404 ,  response.error.message))
      }
      else{
          next() ;
      }
}

// Isloggin As MiddleWare
const isAuthenticated = ('/islog', (req, res,next) => {
    if (req.isAuthenticated()) {
        return next() ;
    } else {
        res.json({ loggedIn: false });
    }
});


// Sign up 
app.post('/signup', async (req, res, next) => {
    try {
        const { username, email, password , profileImg } = req.body;
        const newUser = new user({ username, email ,profileImg });
        let registerUser =  await user.register(newUser, password);

        req.logIn(registerUser , (err)=>{
             if(err){
                next(err) ;
             }
             else{
                res.json({ success: true });
             }
        })
       
    } catch (err) {
        next(err);
    }
});
// Login 
app.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ success: true, user: req.user });
});

 
// Isloggin  As Api
app.get('/islog', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ loggedIn: true, user: req.user });
    } else {
        res.json({ loggedIn: false });
    }
});


// logout : 
app.get("/logout",(req , res , next )=>{
    req.logOut((err)=>{
        if( err ){
            return next(err) ;
        }
        else{
            res.send({success : true}) ;
        }
    })
})


// Messages 
app.post("/message/send/:id",isAuthenticated,asyncWrap(async (req , res)=>{


    const senderId = req.user._id ;  
    const receiverId = req.params.id ;
    let {message} = req.body ; 
    message = message.trim() ; 

    let gotConversation  = await conversation.findOne({
            participants : { $all : [senderId , receiverId]} 
    }) ;

    if( !gotConversation ){
        gotConversation = await conversation.create({
            participants : [ senderId , receiverId ] 
        })
    }

    let newMessage = await messageModel.create({
        senderId , 
        receiverId , 
        message    
    }) ; 

    if(message){
        gotConversation.messages.push(newMessage._id)
    }

    await gotConversation.save() ;
    await newMessage.save() ;

    // Socket : 
    const receiverSocketId = getReceiverSocketId(receiverId) ;

    console.log("this is receiver id " , receiverSocketId) ;

    if( receiverSocketId ){
        io.to(receiverSocketId).emit("newMessage",newMessage) ;
    }


    res.send({ get : true }) ;

 }))


//  get Message  
app.get("/message/:id",isAuthenticated,asyncWrap(async(req , res )=>{

    const senderId = req.user._id ; 
    const receiverId = req.params.id ; 

    let getMessages = await conversation.findOne({
        participants : { $all : [senderId , receiverId]}
    }).populate("messages")  ;  
    


    res.send({ get : true , data : getMessages } ) ;

}))

// get Users 
app.get("/users",asyncWrap(async(req , res )=>{

    let result = await user.find() ; 

    result = result.filter((data)=> data._id != req.user._id.toString()) ;
 
    res.send({ get : true , data : result }) ; 
 
}))

// HOME 

// Home Data
app.get("/listings",asyncWrap(async (req ,res)=>{

    let store = await listing.find() ;
    if(!store){ 
        return next(new ExpressError(500 ,"Database Error"))
    }
    res.json({ get : true , data : store}) ;
}))


// Add New Place 
app.post("/listing/create" , ValidateData ,asyncWrap(async (req ,res,next)=>{
    let store = new listing(req.body) ;
    store.owner = req.user._id ;
    store.image  = req.body.image ;
    await store.save() ; 
    res.json({ get : true }) ;


}))


// To Update Listing 
app.put("/listing/:id", ValidateData ,asyncWrap(async (req , res,next)=>{
    await listing.findByIdAndUpdate(req.params.id,{...req.body})
    res.json({ get : true }) ;
   
}))

// Delete the listings 
app.delete("/listing/:id", asyncWrap(async (req , res)=>{

    await listing.findByIdAndDelete(req.params.id) ;
    res.json({ get : true }) ;

}))


// Post Review 

app.post("/listing/:id/review",ValidateReview,asyncWrap(async(req , res)=>{
    // saving review 
    let result = new review(req.body) ;
    // current user info in review 
    result.author =  req.user._id ; 

    // Referencing 
    let listReview = await listing.findById(req.params.id) ;
    listReview.reviews.push(result) ;


    await result.save() ; 
    await listReview.save() ; 
    res.json({ get : true }) ;


}))

//  Delete Reviews 
app.delete("/listing/:id/reviews/:reviewId",asyncWrap(async(req , res)=>{
        let { id , reviewId } = req.params ;
        // Delete Review 
        await review.findByIdAndDelete(reviewId) ;
        // Delete from place 
        await listing.findByIdAndUpdate(id,{ $pull  : {reviews : reviewId}})

        res.json({ get : true }) ;

}))


// Details Data  ( It should be at the end )
app.get("/listing/:id" , asyncWrap(async (req , res,next)=>{
    let id = req.params.id ; 
    let data = await listing.findById(id).populate({ path : "reviews" , populate : { path : "author"}}).populate("owner") ;
    if(!data){
       return next(new ExpressError(400 , "Data Not Found "))
    }

    res.json({ get : true , data : data}) ;
}))


// IF NOT ROUTE MATCH  
app.all("*", (req ,res,next)=>{
    next( new ExpressError(404 ,"PAGE NOT FOUND"))
})


// ALL ERROR HANDLE 
app.use((err , req , res , next)=>{
    res.json({ get : false , status : err.status ? err.status : 500  , message : err.message ? err.message : "Something went Wrong"}) ;
})



// Port And Server Combined   
server.listen(port , ()=>{
    console.log(`Server is running on port : ${port}`) ;
}) ;    



