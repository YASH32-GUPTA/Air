import React from 'react'


// Component
import { ReviewCard } from '../../components/ReviewCard/reviewCard';



const Reviews = ({currentId,placeId,reviews}) => {

  return (
    <div className='reviewsBox'>
        {
           reviews.map((review,idx)=>(  
                  <ReviewCard key={idx} currentId = {currentId} placeId = {placeId} review = {review}/>
            ))
        }
    </div>
  )
}

export  {Reviews}