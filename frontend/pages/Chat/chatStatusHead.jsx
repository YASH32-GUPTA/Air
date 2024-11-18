import React from 'react'


import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';

// helper 
import { capitalizeWords } from '../../components/helperFunction/helper';

const ChatStatusHead = () => {

  let currentUserData = useSelector((State)=>State.toolkit.getUserStatus) ;
  let onlineUsers = useSelector((State)=>State.toolkit.getOnlineUsers) ;

  return (
   
    
    currentUserData 
    ? 
    <div className="userBoxStatus">
    <Avatar src={currentUserData.profileImg}/>

    <div className="userInfo font" id='fontColor'>
        <h4 className='username'><b>{capitalizeWords(currentUserData.username)}</b></h4>
        <h5 className='username'><b>{ onlineUsers ? onlineUsers.includes(currentUserData._id) ? "Online" : "Offline" : "Loading..."}</b></h5>
    </div>

    </div>
    :
    "Loading..." 
    

  )
}

export {ChatStatusHead}