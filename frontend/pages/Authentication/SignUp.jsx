import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';

// CSS
import '../../public/css/mainForm.css';
import { Footer } from '../../components/Footer/Footer';

// Redux
import { refreshMainPage, setAlert } from '../../features/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuth } from '../../features/toolkit';

import { MainAlert } from '../../components/Alert/MainAlert';

function SignUp() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    profileImg: '',
  });
  const alertDetails = useSelector((state) => state.toolkit.alert);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'image' && files && files[0]) {
      setFormData({
        ...formData,
        profileImg: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'j7ezqaqw'); // Your upload preset name

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/diocnfjtx/image/upload',
        formData
      );
      return response.data.secure_url; // URL of the uploaded image
    } catch (error) {
      console.error('Error uploading image to Cloudinary', error);
      throw error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      try {
        let profileImgUrl = '';

        if (formData.profileImg) {
          profileImgUrl = await handleImageUpload(formData.profileImg);
        }

        const dataToSubmit = {
          ...formData,
          profileImg: profileImgUrl,
        };

        const response = await axios.post(
          'http://localhost:8080/signup',
          dataToSubmit,
          { withCredentials: true }
        );

        if (response.data.success) {
          dispatch(setAlert({ status: true, msg: 'Successfully Signed Up', location: 'home' }));
          dispatch(setAuth());    
          navigate('/');
        } else {
          setFormData({ username: '', email: '', password: '', profileImg: '' });
          dispatch(setAlert({ status: false, msg: response.data.message, location: 'signup' }));
          navigate('/signup');
        }
      } catch (error) {
        console.error('There was an error signing up!', error);
        dispatch(setAlert({ status: false, msg: 'Sign up failed. Please try again.', location: 'signup' }));
      }
    }
  };

  return (
    <>
      <div className="mainTitle font">
        <h2>Sign Up With Air</h2>
      </div>

      {alertDetails && alertDetails.location === 'signup' && <MainAlert alertDetails={alertDetails} />}

      <Form noValidate validated={validated} onSubmit={handleSubmit} className="row g-3 needs-validation mainBox font">
        <Form.Group className="col-md-7" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <Form.Control.Feedback type="invalid">
            Please choose a username.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="col-md-7" controlId="validationCustomEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="col-md-7" controlId="validationCustomPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="col-md-7" controlId="validationCustomImage">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a profile picture.
          </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="col-md-7">
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>

        <Form.Group className="col-md-7">
          <Button className="Custombutton" color="error" variant="outlined" type="submit">
            SignUp
          </Button>
        </Form.Group>
      </Form>
      <div className="helperDiv"></div>
      <span className="formFooter startingFooter"><Footer /></span>
    </>
  );
}

export { SignUp };
