import React, { useEffect, useState } from 'react'
  import { useNavigate  } from 'react-router-dom';


// Icons
import EmailIcon from '@mui/icons-material/Email';
import StarIcon from '@mui/icons-material/Star';
// css 
import '../../public/css/Stats.css'


// Rating Chart 
import {RatingChart} from '../../components/RatingChart/RatingChart'
import { getAvgRating, getIndividualRating } from './GetStats';
import { Button } from '@mui/material';


const Stats = ({placeDetail}) => {

  const [ data , setData  ] = useState({ hostName : "" , avgRating : 0 , totalReviews : 0 }) ;
  const [ ratings , setRatings ] = useState([]) ; 
  const navigate = useNavigate() ; 

  

  useEffect(()=>{

    function getStatsData(){
        try{
            data.hostName = placeDetail.owner.username ;
            data.avgRating  = getAvgRating(placeDetail) ;
            data.totalReviews = placeDetail.reviews.length ; 
            let individualratings = getIndividualRating(placeDetail) ;


            setRatings(individualratings) ;
            setData(data) ;
        }
        catch(err){
            console.log("error occur ") ;
        }
    }

    
    if(placeDetail){
        getStatsData() ;
    } ; 

  },[placeDetail])


  function capitalizeWords(str) {
    // Check if the input is not empty
    if (typeof str !== 'string') return ''; // If input is not a string, return an empty string
    
    // Split the string into words
    let words = str.split(' ');
  
    // Capitalize each word
    let capitalizedWords = words.map(word => {
      if (word.length === 0) return ''; // Handle empty words (e.g., multiple spaces)
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); // Capitalize first letter, lowercase rest
    });
  
    // Join the words back into a single string
    return capitalizedWords.join(' ');
  }

  function handleClick(){
    navigate('/chat') ;
  }
  

  return (
    <div className='statsBox offset-1'>
  
        {/* Host details section */}
        <div className='hostDetails font mt-4'>
            <h4 className='mb-3'>Host Details</h4>
            <h5 className='mb-4'><EmailIcon/> &nbsp; {placeDetail.owner.email}</h5>
            <Button  variant="contained" onClick={()=>handleClick()}>Message Host</Button>
        </div>
    {ratings.length > 0 ? (

        <div className="mainRatingBox">
            
            {/* Other segments */}
            <div className='otherSegments font'>
                <div className="detailBox">
                     <h4><b>{capitalizeWords(placeDetail.owner.username)}</b></h4>
                     <h5>Host Name</h5>

                </div>

                <div className="detailBox">
                     <h4><b>{data.avgRating}&nbsp;<StarIcon className='mb-2' style={{color : "#ffc107"}}/></b></h4>
                     <h5>Average Rating</h5>

                </div>


                <div className="detailBox">
                     <h4><b>{data.totalReviews}</b></h4>
                     <h5>Total Reviews</h5>

                </div>
            </div>

            {/* Rating chart section */}
            <div className='ratingStyle font' style={{ width: '60%'  }}> {/* Ensure sufficient width */}
             <h4 className='mb-4' style={{marginLeft : '4%'}}> <b>Overall Rating's</b></h4>
            <RatingChart data={ratings} />
            </div>
        </div>

       
    ) : <h5><b>{'Currently, no proper information available'}</b></h5>}
  </div>
  )
}

export default Stats