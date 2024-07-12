import React, { useEffect, useState } from 'react'
import axios from 'axios';

// css 
import '../../public/css/error.css' ;
import { MainNavbar } from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer/Footer';

// components 
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';


// Redux
import { useDispatch, useSelector } from 'react-redux';
import { refreshPage  } from '../../features/toolkit';

// Navigate
import { useNavigate } from 'react-router-dom';

const Error = () => {

  const dispatch = useDispatch() ;
  const navigate = useNavigate() ;
  let error = useSelector((State)=>State.toolkit.error)
  console.log("error",error)



  function handleClick(){
    dispatch(refreshPage()) ;
    navigate("/") ;
  }

  return (
    <div className='mainError'>
        {/* Navbar */}
        <span><MainNavbar /></span>

        {/* Error */}
        <div className="errorBox font">
            <Alert severity="error">
            <AlertTitle className='font errorDetails'>Error</AlertTitle>
            <div className="errorDetails">
                <span><p>Status : {error.status}</p></span>
                <span><p>Message : {error.message}</p></span>
            </div>
            </Alert>


            <div className="buttonBox">
            <Button onClick={handleClick} variant="outlined" color="error">Go To Home</Button>
            </div>        
        </div>

        {/* Footer */}
      <span className='formFooter'><Footer /></span>
    </div>
  )
}

export {Error}