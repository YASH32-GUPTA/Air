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

// Redux 
import { useDispatch, useSelector } from 'react-redux';
import { fetchError } from '../features/toolkit.js';
import { PageNotFound } from '../pages/Error/PageNotFound.jsx';




const App = () => {

  // Refresh Content : 
  const dispatch  = useDispatch(); 
  let refresh = useSelector((State)=> State.toolkit.refresh) ; 
  let mainRefresh = useSelector((State)=> State.toolkit.mainPageRefresh)
  console.log(mainRefresh) ;

  // DATABASE DATA 
  const [data , setData ] = useState([{}]) ;

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
                <Route path="/error" element={<Error/>}></Route>
                <Route path="*" element={<PageNotFound/>}></Route>

            </Routes>
        </BrowserRouter>
    </div>
  )
}

export {App}
