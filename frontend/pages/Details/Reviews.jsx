import React from 'react'
import axios from 'axios';


// Navigate
import { useNavigate } from 'react-router-dom';

// Redux 
import { useDispatch } from 'react-redux';
import { refreshPage , fetchError  } from '../../features/toolkit';

const Reviews = ({currentId,placeId,reviews}) => {

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

  return (
    <div className='reviewsBox'>
       <ul>
       {
            reviews.map((review,idx)=>(
            <div key={idx} className="uesrView">
                <li>@{review.author.username} {review.comment} , {review.rating} Stars</li>
                {
                  currentId != null ? 
                  currentId == review.author._id ? 
                  <button onClick={()=>handleDelete(placeId ,review._id)}>Delete</button>
                  :
                  null
                  :
                  null
                }
            </div>
            ))
        }
       </ul>
    </div>
  )
}

export  {Reviews}