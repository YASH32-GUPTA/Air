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
import { setAlert } from '../../features/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { MainAlert } from '../../components/Alert/MainAlert';

let check ; 
function LogIn() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const alertDetails = useSelector((state) => state.toolkit.alert);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      try {
        const response = await axios.post('http://localhost:8080/login',formData, { withCredentials: true });  

        if (response.data.success) {
          dispatch(setAlert({ status: true, msg: 'Successfully Login', location: 'home' }));
          navigate('/');
        } else {
          setFormData({ username: '', password: '' });
          dispatch(setAlert({ status: false, msg: "error", location: 'login' }));
          navigate('/login');
        }
      } catch (error) {
        setFormData({ username: '', password: '' });
        dispatch(setAlert({ status: false, msg: `Login failed. Please try again.${error.response.data}`, location: 'login' }));
        navigate('/login');
      }
    }
  };

  return (
    <>
      <div className="mainTitle font">
        <h2>Login With Air</h2>
      </div>

      {alertDetails && alertDetails.location === 'login' && <MainAlert alertDetails={alertDetails} />}

      <Form noValidate validated={validated} onSubmit={handleSubmit} className="row g-3 needs-validation mainBox font login">
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

        <Form.Group className="col-md-7">
          <Form.Check
            label="Remember Me"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>

        <Form.Group className="col-md-7">
          <Button className="Custombutton" color="error" variant="outlined" type="submit">
            Login
          </Button>
        </Form.Group>
      </Form>
      <div className="logindiv helperDiv"></div>
      <span className="formFooter startingFooter"><Footer /></span>
    </>
  );
}

export { LogIn };
