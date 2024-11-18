import axios from 'axios';
import React, { useState } from 'react';




import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchError, refreshPage, setAlert } from '../../features/toolkit';



import '../../public/css/detail.css';
import Button from '@mui/material/Button';
import '../../public/css/navbar.css';


// components
import { Header } from '../../components/header/header';
import { MainNavbar } from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer/Footer';

let placeSchema = {
  title: '',
  description: '',
  image: {
    url: null,
    filename: ''
  },
  price: 0,
  location: '',
  country: '',
};

const NewListing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [placeDetails, setDetails] = useState(placeSchema);

  function handleInput(name, value) {
    setDetails((prevDetails) => {
      return { ...prevDetails, [name]: value };
    });
  }

  async function handleImageUpload(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'airupload'); // Your upload preset name

    console.log('Uploading file:', file);
    console.log('FormData:', formData);

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/diocnfjtx/image/upload',
        formData
      );
      console.log('Cloudinary Response:', response.data);
      return {
        url: response.data.secure_url, // URL of the uploaded image
        filename: response.data.original_filename // Filename of the uploaded image
      };
    } catch (error) {
      console.error('Error uploading image to Cloudinary', error);
      console.log('Error Response:', error.response);
      throw error;
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        // Upload image to Cloudinary and get the URL and filename
        const imageData = await handleImageUpload(placeDetails.image);
        const placeData = { ...placeDetails, image: { url: imageData.url, filename: imageData.filename } };

        // Post Request to your backend with the image data
        let response = (
          await axios.post(
            'http://localhost:8080/listing/create',
            placeData,
            { withCredentials: true }
          )
        ).data;

        if (response.get) {
          dispatch(refreshPage());
          dispatch(
            setAlert({
              status: true,
              msg: 'Successfully Listing is added',
              location: 'home',
            })
          );
          navigate('/');
          console.log('Submit');
        } else {
          dispatch(fetchError(response));
          navigate('/error');
        }
      } catch (error) {
        console.error('Error during form submission', error);
      }
    }

    form.classList.add('was-validated');
  }

  console.log('form data ', placeDetails);

  return (
    <div className="row">
      <span><MainNavbar /></span>
      <div className="col-8 offset-3 mt-5 mainForm">
        <div className="listForm">
          <span className="formsHeader">
            <Header title={"Add New Place"} />
          </span>
          <form
            onSubmit={handleSubmit}
            className="needs-validation"
            noValidate
            encType="multipart/form-data"
          >
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                className="form-control"
                name="title"
                placeholder="Enter the catchy title"
                type="text"
                value={placeDetails.title}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                required
              />
              <div className="invalid-feedback">
                Please provide a title.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                type="text"
                value={placeDetails.description}
                placeholder="The Place is..."
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                required
              />
              <div className="invalid-feedback">
                Please provide a description.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="form-label">Image</label>
              <input
                className="form-control"
                name="image"
                type="file"
                placeholder="Add Photo"
                onChange={(e) => handleInput(e.target.name, e.target.files[0])}
                required
              />
              <div className="invalid-feedback">
                Please provide an image URL.
              </div>
            </div>

            <div className="row">
              <div className="mb-3 col-md-4">
                <label htmlFor="price" className="form-label">Price</label>
                <input
                  className="form-control"
                  name="price"
                  type="text"
                  value={placeDetails.price}
                  placeholder="Best And Affordable"
                  onChange={(e) => handleInput(e.target.name, e.target.value)}
                  required
                />
                <div className="invalid-feedback">
                  Please provide a price.
                </div>
              </div>

              <div className="mb-3 col-md-8">
                <label htmlFor="country" className="form-label">Country</label>
                <input
                  name="country"
                  className="form-control"
                  type="text"
                  value={placeDetails.country}
                  placeholder="Which country?"
                  onChange={(e) => handleInput(e.target.name, e.target.value)}
                  required
                />
                <div className="invalid-feedback">
                  Please provide a country.
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="location" className="form-label">Location</label>
              <input
                name="location"
                className="form-control"
                type="text"
                value={placeDetails.location}
                placeholder="Where Located?"
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                required
              />
              <div className="invalid-feedback">
                Please provide a location.
              </div>
            </div>


            <div className='mb-3'>
            <label htmlFor="category" className='form-label'>Category</label>
            <select
              name='category'
              className='form-control'
              value={placeDetails.category}
              onChange={(e) => handleInput(e.target.name, e.target.value)}
              style={{cursor : "pointer"}} 
              required
            >
              <option value="">Select a category</option>
              <option value="Luxury Travel">Luxury Travel</option>
              <option value="Adventure Travel">Adventure Travel</option>
              <option value="Eco-Tourism">Eco-Tourism</option>
              <option value="Cultural Travel">Cultural Travel</option>
              <option value="Family Travel">Family Travel</option>
            </select>
              <div className="invalid-feedback">
                Please provide a category.
              </div>
            </div>

            <Button type="submit" variant="outlined" color="error">Add Place</Button>
          </form>
        </div>
      </div>
      <span className="formFooter"><Footer /></span>
    </div>
  );
}

export { NewListing };
