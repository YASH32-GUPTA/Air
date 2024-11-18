import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isLogged } from '../../pages/Authentication/IsLogginIn';
import { fetchError, refreshPage, setAlert, setAuth } from '../../features/toolkit';  
import axios from 'axios';
import { useEffect, useState } from 'react';
import CustomizedInputBase from '../SearchBar/Search';
import { Avatar } from '@mui/material';

function MainNavbar() {

  const navigate = useNavigate() ;
  const dispatch = useDispatch() ;
  let refresh = useSelector((State)=>State.toolkit.refresh) ;
  const [ userStatus , setStatus  ] = useState(null) ;
  const [ userDetails , setDetails ] = useState({}) ;

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
        dispatch(refreshPage()) ;
        dispatch(setAlert({status : true , msg : "Successfully Logout " , location : "home"}))
        dispatch(setAuth()) ;
        setStatus(false) ;
        navigate("/") ;
      }
      else{
        console.log("err",result)
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
           setDetails(result) ; 
           setStatus(true) ;
        }
        else{
          setDetails({}) ; 
          setStatus(false);
        }
    }

    getLoggedCheck() ;
  },[refresh])

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

          {/* Nav  bar  */}
          <div className="mainSearchBar">
            <CustomizedInputBase/>
          </div>

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

          <Nav className='userAvatar'>
              <Avatar src={ userDetails && userDetails.user ? userDetails.user.profileImg : ''}/>
          </Nav>

        </Container>
      </Navbar>
    </>
  );
}

export {MainNavbar};