import React from 'react'

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBTypography,
} from "mdb-react-ui-kit";



import AccessTimeIcon from '@mui/icons-material/AccessTime';

// helper Function 
import { capitalizeWords  } from '../../components/helperFunction/helper';


const ChatsReceiverEnd = ({chat,receiver}) => {

  function handleDateFormat(createdAt){
    const dateObject = new Date(createdAt);
    const date = dateObject.toISOString().split('T')[0]; 
    
    return date ;     
  }


  return (
    <>
    {/* receiver user  */}

    <div className="chat chat-end font  receiverBox">
            <MDBContainer fluid className="py-5">
          <MDBRow>
            <MDBCol md="6" lg="7" xl="8">
              <MDBTypography listUnStyled>
              <li className="d-flex justify-content-between mb-4">
              <MDBCard className="w-100">
                <MDBCardHeader className="d-flex justify-content-between p-3">
                  <p className="fw-bold mb-0">{capitalizeWords(receiver.username)}</p>
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
              <img
                src={receiver.profileImg}
                alt="avatar"
                className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                width="60"
              />
              </li>  
              </MDBTypography>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        </div>
    </>
  )
}

export default ChatsReceiverEnd