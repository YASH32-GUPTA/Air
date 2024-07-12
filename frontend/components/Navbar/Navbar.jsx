import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isLogged } from '../../pages/Authentication/IsLogginIn';
import { fetchError, setAlert } from '../../features/toolkit';  
import axios from 'axios';
import { useEffect, useState } from 'react';

function MainNavbar() {

  const navigate = useNavigate() ;
  const dispatch = useDispatch() ;
  const [ userStatus , setStatus  ] = useState(null) ;


  async function handleClick(){

    let response = await isLogged() ; 

    if( response ){
      navigate("/listing/create") ;
    }
    else{
      dispatch(setAlert({status : false , msg : "Need To Login !" , location : "login"}))
      navigate("/login");
    }

  }

  async function handleSession(val){

    if(val == "Signup"){
      navigate("/signup")
    }
    else if ( val == "Login"){
      navigate("/login")

    }
    else{
      let result = (await axios.get("http://localhost:8080/logout",{withCredentials : true})).data ;
      if(result.success){
        dispatch(setAlert({status : true , msg : "Successfully Loguut " , location : "home"}))
        setStatus(false) ;
        navigate("/") ;
      }
      else{
        dispatch(fetchError(result)) ;
        navigate("/error") ;
      }
    }
  }

  useEffect(()=>{

    async function getLoggedCheck(){
        let result  = (await axios.get('http://localhost:8080/islog',{withCredentials : true})).data
        console.log("result" , result )
        if( result.user){
           setStatus(true) ;
        }
        else{
          setStatus(false);
        }
    }

    getLoggedCheck() ;
  },[])

  return (
    <>
      <Navbar bg="light" data-bs-theme="light" className='border-bottom mainNav sticky-top'>
        <Container>
          <Nav className="me-auto font">
          <Navbar.Brand href="/" className='navIcon'><ExploreOutlinedIcon/></Navbar.Brand>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link onClick={handleClick}>Add Listings</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Nav className=" font">
            {userStatus ?  
            <Nav.Link onClick={async ()=> await handleSession("Logout")}>Logout</Nav.Link>
            : 
            <>
            <Nav.Link onClick={async ()=> await handleSession("Signup")}>Signup</Nav.Link>
            <Nav.Link onClick={async ()=> await handleSession("Login")}>Login</Nav.Link>
            </>
            }
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export {MainNavbar};