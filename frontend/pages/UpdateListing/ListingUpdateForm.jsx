import React, { useEffect } from 'react'
import { useState } from 'react';
// Naviagte
import { useNavigate } from 'react-router-dom';

// Paramters 
import { useParams } from 'react-router-dom'

// Redux 
import { useSelector , useDispatch } from 'react-redux';
import { fetchError , setAlert } from '../../features/toolkit';
import axios from 'axios';

// Css
import '../../public/css/detail.css'
import Button from '@mui/material/Button';
import '../../public/css/navbar.css'


// Components 
import { Header } from '../../components/header/header';
import { MainNavbar } from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer/Footer';


const ListingUpdateForm = () => {



  let placeDetail = useSelector((State)=> State.toolkit.givePlaceDetails) ;


  const [ placeDetails , setDetails ] = useState({...placeDetail}) ;

  const { id } = useParams() ;  
  const navigate = useNavigate() ;
  const dispatch = useDispatch() ;



  // ~ Case for API    
  useEffect(()=>{
    async function getCheckId(){
        // Delete Request : 
        let response = (await axios.get(`http://localhost:8080/listing/${id}`)).data ;

        if(response.get){
            console.log("Valid") ;
        }
        else{
        dispatch(fetchError(response)) ; 
        navigate("/error") ;
        }
    }

    getCheckId() ; 
  },[])




  function handleInput(name , value){
    placeDetails[name] = value ; 
    setDetails(()=>{
        return {...placeDetails} ;
    }) ;
  }

  async function handleSubmit(event){

    event.preventDefault();
    const form = event.currentTarget;

    console.log("After edit" , placeDetails) ;
    if (form.checkValidity() === false) {
        event.stopPropagation();
    } 
    else{
     
      try{
        // Post Request : 
        let response = (await axios.put(`http://localhost:8080/listing/${id}`,placeDetails)).data ;

        if(response.get){
        dispatch(setAlert({status : true , msg : "Successfully Listing is Edited" , location : "details"}))
        navigate(`/detail/${id}`)
        console.log("Sumbit") ;
        }
        else {
            dispatch(fetchError(response)) ; 
            navigate("/error") ;
        }
      }
      catch (error) {
        console.error("Error during form submission", error);
      }
    }

    form.classList.add('was-validated');

  }
  



  return (
    <div className="row">
            <span><MainNavbar /></span>
            <div className="col-8 offset-2 mt-5 mainForm">
                <div className='listForm'>
                    <span className='formsHeader'><Header title={"Edit Your Listing"} /></span>
                    <form onSubmit={handleSubmit} className='needs-validation' noValidate>
                        <div className='mb-3'>
                            <label htmlFor="title" className='form-label'>Title</label>
                            <input
                                className='form-control'
                                name="title"
                                type="text"
                                value={placeDetails.title}
                                onChange={(e) => handleInput(e.target.name, e.target.value)}
                                required
                            />
                            <div className="invalid-feedback">
                                Please provide a title.
                            </div>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="description" className='form-label'>Description</label>
                            <textarea
                                className='form-control'
                                name="description"
                                type="text"
                                value={placeDetails.description}
                                onChange={(e) => handleInput(e.target.name, e.target.value)}
                                required
                            />
                            <div className="invalid-feedback">
                                Please provide a description.
                            </div>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="image" className='form-label'>Image</label>
                            <input
                                className='form-control'
                                name="image"
                                type="text"
                                value={placeDetails.image}
                                onChange={(e) => handleInput(e.target.name, e.target.value)}
                                required
                            />
                            <div className="invalid-feedback">
                                Please provide an image URL.
                            </div>
                        </div>

                        <div className="row">
                            <div className='mb-3 col-md-4'>
                                <label htmlFor="price" className='form-label'>Price</label>
                                <input
                                    className='form-control'
                                    name="price"
                                    type="text"
                                    value={placeDetails.price}
                                    onChange={(e) => handleInput(e.target.name, e.target.value)}
                                    required
                                />
                                <div className="invalid-feedback">
                                    Please provide a price.
                                </div>
                            </div>

                            <div className='mb-3 col-md-8'>
                                <label htmlFor="country" className='form-label'>Country</label>
                                <input
                                    name='country'
                                    className='form-control'
                                    type="text"
                                    value={placeDetails.country}
                                    onChange={(e) => handleInput(e.target.name, e.target.value)}
                                    required
                                />
                                <div className="invalid-feedback">
                                    Please provide a country.
                                </div>
                            </div>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="location" className='form-label'>Location</label>
                            <input
                                name='location'
                                className='form-control'
                                type="text"
                                value={placeDetails.location}
                                onChange={(e) => handleInput(e.target.name, e.target.value)}
                                required
                            />
                            <div className="invalid-feedback">
                                Please provide a location.
                            </div>
                        </div>

                        <Button type='submit' variant="outlined" color="error">Edit Place</Button>
                    </form>
                </div>
            </div>
            <span className='formFooter'><Footer /></span>
        </div>
  )
}

export {ListingUpdateForm}