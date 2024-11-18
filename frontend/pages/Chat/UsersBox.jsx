import React, { useEffect, useState } from 'react'
import { Avatar } from '@mui/material';

import axios from 'axios';

import { fetchError, setChatUserStatus, setReceiverId } from '../../features/toolkit';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Helper  functions 
import { capitalizeWords } from '../../components/helperFunction/helper';

const UsersBox = () => {

  const dispatch = useDispatch() ;
  const navigate = useNavigate() ; 


  //  Receiver Status Detail  :   
  const [ userStatusDetails , setUserDetails ] = useState([{}]) ;
  console.log("USD",userStatusDetails) ;    


  useEffect(()=>{
    async function getChatData(){

        let response = (await axios.get(`http://localhost:8080/users`,{withCredentials : true})).data

        if( response.get ){

            if( response.data.length > 0 ){
                setUserDetails(response.data);
            }
            else{
                setUserDetails([])  ;
            }
        }
        else{
            dispatch(fetchError(response));
            navigate('/error');
        }
    }

    getChatData() ; 

  },[])

  function handleUserClick(data){
     dispatch(setChatUserStatus(data)) ; 
     dispatch(setReceiverId(data._id)) ;
  }


  return (  
     <>
        {
            userStatusDetails && userStatusDetails.length > 0 ?
            <>
             {
                   userStatusDetails.map((data , idx )=>{   
                    return (
                        <React.Fragment key={idx}>
                        <div style={{cursor : "pointer"}} className="userBox" onClick={()=>handleUserClick(data)}>
                        <Avatar src={data.profileImg}/>
                        <h4  className='username'><b>{capitalizeWords(data.username)}</b></h4>
                        </div>
                        <div className='reviewLine'><div className="sepLine"></div></div> 
                        </React.Fragment>
                    )
                })
            

             }
            </>
            :
            "No Host's Found"
        }
     </>
  ) 
}

export  {UsersBox}