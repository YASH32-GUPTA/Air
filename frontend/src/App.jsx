import React from 'react' ;
import 'bootstrap/dist/css/bootstrap.min.css';


// URLS 
import axios from 'axios' ;  
import { BrowserRouter,Routes,Route} from 'react-router-dom' ;
// STATE
import { useEffect , useState } from 'react' ; 
// PAGES
import {HomeScreen} from '../pages/HomeScreen/HomeScreen.jsx';
import {Details} from '../pages/Details/Details.jsx';
import {NewListing} from '../pages/NewListing/form.jsx' ;
import {ListingUpdateForm} from '../pages/UpdateListing/ListingUpdateForm.jsx';
import { Error } from '../pages/Error/Error.jsx';
import { SignUp } from '../pages/Authentication/SignUp.jsx';
import { LogIn } from '../pages/Authentication/Login.jsx';
import Category from '../pages/Category/Category.jsx';
import Chat from '../pages/Chat/Chat.jsx';
import { PageNotFound } from '../pages/Error/PageNotFound.jsx';

// Redux 
import { useDispatch, useSelector } from 'react-redux';
import { fetchError, setOnlineUsers, setSocket } from '../features/toolkit.js';
import { isLoggedWithDetails } from '../pages/Authentication/IsLogginIn.js';

// Socket 
import io from 'socket.io-client'



const App = () => {

  // Refresh Content : 
  const dispatch  = useDispatch(); 
  let refresh = useSelector((State)=> State.toolkit.refresh) ; 
  let mainRefresh = useSelector((State)=> State.toolkit.mainPageRefresh)

  // DATABASE DATA 
  const [data , setData ] = useState([{}]) ;
  // console.log(data) ;

  // Socket 
  let socket = useSelector((State)=>State.toolkit.socket) ;
  let authUser = useSelector((State)=> State.toolkit.checkAuth) ;
 

  useEffect(()=>{
     
    async function getData(){
      try{
        let dbData = (await axios.get("http://localhost:8080/listings")).data
       
        if( dbData.get ){
          setData(dbData.data) ;
        }
        else{
             dispatch(fetchError(dbData)) ; 
             navigate("/error") ;
        }
  
      }
      catch(err){
        console.log(err) ;
      }
    }
    getData() ;

  },[refresh,mainRefresh])


  // Socket 
  useEffect(()=>{

     async function socketConnect(){
      //  getting  logged User
      let authUserDetails = await isLoggedWithDetails() ; 

      if( authUserDetails ){
        console.log("Call socket ! ")
        const socket = io("http://localhost:8080",{
          query : {
            userId : authUserDetails.user._id 
          }    
        }) ; 

        // first Set Socket : 
        console.log("socket" ,  socket );
        dispatch(setSocket(socket)) ;

        socket.on('getOnlineUsers',(onlineUsers)=>{
           console.log("gonline", onlineUsers) ;
           dispatch(setOnlineUsers(onlineUsers)) ;
        }

       )}
      else{
         // Clean Up Socket  
          if(socket){
            socket.close() ; 
            dispatch(setSocket(null)) ;
          }
      }}

     socketConnect() ; 

  },[authUser])





  return (
    <div className='main'>
       <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeScreen data = {data} />}></Route>
                <Route path="/signup" element={<SignUp/>}></Route>
                <Route path="/login" element={<LogIn/>}></Route>
                <Route path="/detail/:id" element={<Details/>}></Route>
                <Route path="/listing/create" element={<NewListing/>}></Route>
                <Route path="/listing/:id/edit" element={<ListingUpdateForm/>}></Route>
                <Route path="/category/:content" element={<Category  data = {data}/>}></Route>
                <Route path="/chat" element={<Chat data = {data}/>}></Route>
                <Route path="/error" element={<Error/>}></Route>
                <Route path="*" element={<PageNotFound/>}></Route>

            </Routes>
        </BrowserRouter>
    </div>
  )
}

export {App}
