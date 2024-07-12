import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import { listing } from './models/Listings.js';
import bodyParser from 'body-parser';
// Schema
import { ListingSchema ,ReviewSchema } from './utils/ValidationSchema.js';
import { review } from './models/Review.js'

// Session 
import session from 'express-session';

// Error handlers 
import { asyncWrap } from './utils/AysncWrap.js';
import { ExpressError } from './utils/ExpressErrror.js';

// Authentication 
import passport from 'passport';
import LocalStrategy from 'passport-local'
import { user } from './models/user.js'; 

// APP WORK 
const port = 8080 ; 
const app = express() ; 



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



// Middlewares
app.use(cors({
    origin: 'http://localhost:5174' // Replace this with the origin of your React app
    ,
    credentials: true // Allow credentials (cookies, authorization headers)
}));


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
    console.log({ listing : {...req.body}})
    // JOI VALIDATION
    const response = ListingSchema.validate({ listing : {...req.body}}, { abortEarly: false });
        
    if (response.error) {
        return next( new ExpressError(404 ,  response.error.message))
    }
    else{
        console.log("next work")
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


// Sign up 
app.post('/signup', async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new user({ username, email });
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

// Isloggin 
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


// HOME 
app.get("/",(req , res)=>{
    res.send("API WORK") ;
})


// Home Data
app.get("/listings",asyncWrap(async (req ,res)=>{

    let store = await listing.find() ;
    if(!store){ 
        return next(new ExpressError(500 ,"Database Error"))
    }
    res.json({ get : true , data : store}) ;
    console.log("Data has been sent !") ;
}))


// Add New Place 
app.post("/listing/create" , ValidateData ,asyncWrap(async (req ,res,next)=>{
    let store = new listing(req.body) ;
    store.owner = req.user._id ;
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



// Port Run     
app.listen(port,()=>{
    console.log("Port is listening at 8080 ") ;
})



