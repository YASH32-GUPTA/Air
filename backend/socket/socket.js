import express from 'express'
import { Server } from 'socket.io'
import cors from 'cors'
import http from 'http' ;



// server 
const app = express() ; 

// Middlewares
app.use(cors({
    origin: 'http://localhost:5173' // Replace this with the origin of your React app
    ,
    credentials: true // Allow credentials (cookies, authorization headers)
}));


// Top server 
const server =  http.createServer(app) ;

const io = new Server(server , {
    cors : {
        origin : "http://localhost:5173" , 
        methods : [ "GET" , "POST" ] 
    }
}) ; 


let userSocketMap = {   } ;

// On Socket 
io.on('connection',(socket)=>{
    
    // userId 
    const userId = socket.handshake.query.userId
    console.log("user connected" , userId ) ;
    
    
    if( userId !== undefined ){
        userSocketMap[userId] = socket.id ; 
    }
    
    // Sending Data to frontEnd 
    io.emit('getOnlineUsers' ,Object.keys(userSocketMap)) ;
    

    socket.on('disconnect',()=>{
        console.log("user disconnected" , userId) ;
        delete userSocketMap[userId] ;
        io.emit('getOnlineUsers' ,Object.keys(userSocketMap)) ;

    })

}) ;


function getReceiverSocketId(receiverId){
    return userSocketMap[receiverId] ;
}

export {io , server, app , getReceiverSocketId } ;
 