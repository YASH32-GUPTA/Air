import React, { useEffect, useState } from 'react'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBTypography,

} from "mdb-react-ui-kit";



// Icons
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DoneIcon from '@mui/icons-material/Done';
import { CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setNewMessageLoad } from '../../features/toolkit';

// helper 
import { capitalizeWords } from '../../components/helperFunction/helper';

const ChatsUserEnd = ({chat,newMessageLoad,currentUser}) => {

  function handleDateFormat(createdAt){
    const dateObject = new Date(createdAt);
    const date = dateObject.toISOString().split('T')[0]; 
    
    return date ;     
  }

  console.log(newMessageLoad );
  
  
  const [showDone, setShowDone] = useState(false);
  const dispatch = useDispatch()  ; 

  useEffect(() => {
    if (newMessageLoad) {
      setShowDone(false);
      
      const timer = setTimeout(() => {
        setShowDone(true);
        dispatch(setNewMessageLoad(false)) ;
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [newMessageLoad]);


  return (
   <>

  {/* sender user  */}     
    <div className="chat chat-end senderBox font" >
    <MDBContainer fluid className="py-5">
          <MDBRow>
            <MDBCol md="6" lg="7" xl="8">
              <MDBTypography listUnStyled>
                <li className="d-flex justify-content-between mb-4">
                  <img
                    src={currentUser.profileImg}
                    alt="avatar"
                    className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                    width="60"
                    height="50"

                  />
                  <MDBCard>
                    <MDBCardHeader className="d-flex justify-content-between p-3">
                      <p className="fw-bold mb-0">{capitalizeWords(currentUser.username)}</p>
                      <p className="text-muted small mb-0">
                      <AccessTimeIcon style={{color : "ebebeb"}}/>{handleDateFormat(chat.createdAt)}
                      </p>
                    </MDBCardHeader>
                    <MDBCardBody>
                      <p className="mb-0">
                      {chat.message}
                      </p>
                    </MDBCardBody>
                  </MDBCard>

                </li>
        
                  <MDBCardBody className='messageStatus font'>
                    <div className="innerMessage">
                          {
                            newMessageLoad ?
                            showDone ? 
                            <>
                            <DoneIcon/>
                            <p style={{color : "#fff" , marginLeft : "10%" , fontWeight : "550"}}>Delivered</p>
                            </>
                            :
                            <CircularProgress/>
                            :
                            <>
                              <DoneIcon/>
                              <p style={{color : "#fff" , marginLeft : "10%" , fontWeight : "550"}}>Delivered</p>
                            </>
                          }


                    </div>
                </MDBCardBody>
              </MDBTypography>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        </div>
   </>
  )
}

export default ChatsUserEnd

