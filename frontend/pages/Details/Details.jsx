import React, { useEffect, useState } from 'react'
import axios from 'axios';

// Navigate
import { useNavigate } from 'react-router-dom';


// Parameters
import { useParams } from 'react-router-dom'

// Redux 
import { useDispatch, useSelector } from 'react-redux';
import { refreshPage , giveDetails, fetchError , refreshMainPage , setAlert } from '../../features/toolkit';

// Components 
import { MainNavbar } from '../../components/Navbar/Navbar';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/Footer/Footer';
import Button from '@mui/material/Button';
import { Reviews } from './Reviews';
import { MainAlert } from '../../components/Alert/MainAlert';
import { isLoggedWithDetails } from '../Authentication/IsLogginIn';

const Details = () => {


  const [Review, setReview] = useState({
    rating: 3,
    comment: ''
  });



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };



  const { id } = useParams() ;
  const [placeDetail , setDetails ] = useState([]) ;
  const [ currentUser , setUser ] = useState({}) ;
  const navigate = useNavigate() ;
  const dispatch = useDispatch() ;
  let refresh = useSelector((State)=>State.toolkit.refresh)
  let alertDetails = useSelector((State)=>State.toolkit.alert)


  console.log("pd" , placeDetail) ;

  // Getting place details :   
  useEffect(()=>{
     async function  getDetails(){
       try{
        const placeDetail = (await axios.get(`http://localhost:8080/listing/${id}`,{withCredentials : true })).data
        console.log("under react" , placeDetail) ;

        if( placeDetail.get ){
        setDetails(placeDetail.data) ;
        }
        else{
           dispatch(fetchError(placeDetail)) ; 
           navigate("/error") ;
        }

       }
       catch(error){
         console.log(error) ; 
       }
     }

     getDetails() ; 
  },[refresh])

  useEffect(()=>{
    async function getCurrentUserId(){
      let result = await isLoggedWithDetails() ; 
      console.log("cu" , result) ;
        if( result ){
          setUser(result) ;
        }
        else{
          setUser(null) ;
        }
    } 

    getCurrentUserId() ;
  },[])


  // Edit Listing 
 async function handleEdit(id){
    let result = await isLogged() ;
    if(result){
      dispatch(giveDetails(placeDetail)) ;
      navigate(`/listing/${id}/edit`) ;
    }
    else{
      dispatch(setAlert({status : false , msg : "Need To Login !" , location : "login"}))
      navigate("/login");   
    }
  }


  async function handleDeleteListing(id){
    if( await isLogged() ){
       // Delete Request : 
    let response = (await axios.delete(`http://localhost:8080/listing/${id}`)).data ;

    if(response.get){
        dispatch(refreshMainPage())
        dispatch(setAlert({status : false , msg : "Successfully deleted the listing" , location : "home"}))
        navigate("/")
        console.log("Deleted") ;
    }
    else{
      dispatch(fetchError(response)) ; 
      navigate("/error") ;
    }
    }
    else{
      dispatch(setAlert({status : false , msg : "Need To Login !" , location : "login"}))
      navigate("/login");   
    }
  }
  

  async function handleReview(){
    console.log(Review) ;
    event.preventDefault() ; 
     // Delete Request : 
     let response = (await axios.post(`http://localhost:8080/listing/${id}/review`,Review,{withCredentials : true})).data ;

     if(response.get){
         setReview({rating : 3 , comment : ""}) ;
         dispatch(refreshPage())
         console.log("Review Added") ;
         navigate(`/detail/${id}`)
     }
     else{
       dispatch(fetchError(response)) ; 
       navigate("/error") ;
     }
  }
 
  return (
    <div className='row details'>
        {
            placeDetail.length == 0 ? 
            "Loading..." 
            :
          <>
          <div className="row">
              <span><MainNavbar/></span>
                {/* Alert  */}
                { alertDetails ? alertDetails.location == "details" ?  <MainAlert alertDetails={alertDetails}/> : null : null }

              <span className='formsHeader mt-2'><Header  title = {"Listing Details"}/></span>
                <div className="row imgContent detailBox offset-3">
                    <img src={placeDetail.image} alt="PlaceImage" />
                </div>

                <div className="col placeContent">
                      <div className='font'>
                        <h4>Place</h4>
                        <p className='listingFont'>{placeDetail.title}</p>
                        
                      </div>

                      <div className='font'>
                        <h4>Owner</h4>
                        <p className='listingFont'>{placeDetail.owner.username.toUpperCase()}</p>
                        
                      </div>

                      <div className='font'>
                        <h4>Description</h4>
                        <p className='listingFont description'>{placeDetail.description}</p>
                      </div>

                      <div className='font'>
                        <h4>Price</h4>
                        <p className='listingFont'>&#8377; { placeDetail.price.toLocaleString()}</p>
                      </div>

                      <div className='font'>
                        <h4>Location</h4>
                        <p className='listingFont'>{placeDetail.location}</p>
                        
                      </div>

                      <div className='font'>
                        <h4>Country</h4>
                        <p className='listingFont' >{placeDetail.country}</p>
                      </div>
                    
                      {
                        currentUser && currentUser.user ? 
                        currentUser.user._id == placeDetail.owner._id ? 
                        <div className="buttons">
                        <div className="editButton">
                        <Button  variant="outlined" onClick={()=>handleEdit(placeDetail._id)}>Edit Listing</Button>
                        </div>
                        <div className="deleteButton">
                        <Button variant="outlined" color="error" onClick={()=>handleDeleteListing(placeDetail._id)}>Delete Listing</Button>
                        </div>
                        </div>
                        :
                        null 
                        : 
                        null
                      }

                </div>
          </div>


          {/* Form  for Reviews  */}
          {console.log("place detail" , placeDetail)}
          {console.log("current user" , currentUser)}


          {
           currentUser != null ?  
          <div className="row">
                <h2 className='font'>Review Section</h2>
                <div className="row">

                    <form onSubmit={handleReview}>
                        {/* rating */}
                        <div className="rating">
                            <label htmlFor="rate">Rating</label>
                            <input
                            id="rate" type="range" min={1} max={5}
                            name='rating'
                            value={Review.rate}
                            onChange={handleInputChange}
                            required
                            />

                        </div>

                        {/* Comment  */}
                        <div className="comment">
                            <label htmlFor="comment">Comment</label>
                            <textarea 
                             name="comment" id="comment" cols={50}
                             value={Review.comment}
                             onChange={handleInputChange} 
                             required>
                            </textarea>

                        </div>

                        <div className="reviewButton">
                            <button>Sumbit</button>
                        </div>


                    </form>
                </div>
          </div>  
          : 
          null
          }

          {/* Listing Reviews  */}
          <div className="row mt-3 mb-3">
              <h2 className='font'>Listed Reviews</h2>
              { placeDetail  && placeDetail.reviews ? placeDetail.reviews.length > 0 ? <Reviews currentId = { currentUser && currentUser.user ? currentUser.user._id : null } placeId = {placeDetail._id} reviews = {placeDetail.reviews}/> : " Currently No Reviews" : null }
          </div>




          <span className='formFooter'><Footer/></span> 

          </>
        }
    </div>
  )
}

export {Details}