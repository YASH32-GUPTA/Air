import { Button } from '@mui/material';
import Card from 'react-bootstrap/Card';


import axios from 'axios';


// Navigate
import { useNavigate } from 'react-router-dom';

// Redux 
import { useDispatch } from 'react-redux';
import { refreshPage , fetchError  } from '../../features/toolkit';


function ReviewCard({currentId,placeId,review}) {


  const navigate = useNavigate() ;
  const dispatch = useDispatch() ;

  async function handleDelete(id , reviewId){
      // Delete Request : 
      let response = (await axios.delete(`http://localhost:8080/listing/${id}/reviews/${reviewId}`,{withCredentials : true })).data ;

      if(response.get){
          dispatch(refreshPage())
          console.log("Review Deleted") ;
          navigate(`/detail/${id}`)
      }
      else{
      dispatch(fetchError(response)) ; 
      navigate("/error") ;
      }
  }  


  function handleDateFormat(createdAt){
    const dateObject = new Date(createdAt);
    const date = dateObject.toISOString().split('T')[0]; 
    
    return date ;     
  }

  return (
    <Card style={{ width: '30rem' }} className='singleReviewBox'>
      <Card.Body>
        <div className="reviewContent">

        <div>
        <Card.Title style={{color : '#000'}}>@{review.author.username}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted"><p className="starability-result ratingReviewSize" data-rating={review.rating}></p></Card.Subtitle>
        </div>

        <div className="time">
            <span className='font dateFont'>{handleDateFormat(review.createdAt)} </span>
        </div>


        </div>
        <Card.Text style={{color : '#000'}}>{review.comment}</Card.Text>
        {
        currentId != null ? 
        currentId == review.author._id ? 
        <Button className='buttonReview' type='submit' variant="outlined"  onClick={()=>handleDelete(placeId ,review._id)}>Delete</Button>
        :
        null
        :
        null
      }
      </Card.Body>
    </Card>
  );
}

export {ReviewCard};