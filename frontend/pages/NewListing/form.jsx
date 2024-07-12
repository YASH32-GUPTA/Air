import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

// redux 
import { fetchError, refreshPage, setAlert} from '../../features/toolkit';
import { useDispatch  } from 'react-redux'

// Css
import '../../public/css/detail.css'
import Button from '@mui/material/Button';
import '../../public/css/navbar.css'



// Components 
import { Header } from '../../components/header/header';
import { MainNavbar } from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer/Footer';



let placeSchema = {
    title : "" ,
    description : "" ,
    image : "" , 
    price : 0 ,
    location : "",
    country : "" ,
}


const NewListing = () => {
 
  const navigate = useNavigate() ;
  const dispatch = useDispatch() ;

  const [ placeDetails , setDetails ] = useState(placeSchema) ;

  function handleInput(name , value){
    placeDetails[name] = value ; 
    setDetails(()=>{
        return {...placeDetails} ;
    }) ;
  }

  async function handleSubmit(event){
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
        event.stopPropagation();
    } 
    else {
        // Post Request:
        try {
            let response = (await axios.post("http://localhost:8080/listing/create", placeDetails,{withCredentials : true })).data;

            if (response.get) {
                dispatch(refreshPage());
                dispatch(setAlert({status : true , msg : "Successfully Listing is added" , location : "home"}))
                navigate("/");
                console.log("Submit");
            } else {
               dispatch(fetchError(response)) ; 
               navigate("/error") ;
            }
        } catch (error) {
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
            <span className='formsHeader'><Header title={"Add New Place"} /></span>
            <form onSubmit={handleSubmit} className='needs-validation' noValidate>
                <div className='mb-3'>
                    <label htmlFor="title" className='form-label'>Title</label>
                    <input
                        className='form-control'
                        name="title"
                        placeholder='Enter the catchy title'
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
                        placeholder='The Place is...'
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
                        placeholder='Add Photo'
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
                            placeholder='Best And Affordable'
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
                            placeholder='Which country?'
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
                        placeholder='Where Located?'
                        onChange={(e) => handleInput(e.target.name, e.target.value)}
                        required
                    />
                    <div className="invalid-feedback">
                        Please provide a location.
                    </div>
                </div>

                <Button type='submit' variant="outlined" color="error">Add Place</Button>
            </form>
        </div>
    </div>
    <span className='formFooter'><Footer /></span>
</div>
  )
}

export{NewListing}