import React from 'react'
// Navigate 
import { useNavigate } from 'react-router-dom'
// Components 
import MainCard from '../MainCard/card';

const Place = ({place}) => {

  const navigate = useNavigate() ;

  function handleView(id){
    navigate(`/detail/${id}`)
  }

  return (
    <div className='place' onClick={()=>handleView(place._id)}>
        <ul>
            { place ? <MainCard  place = {place} /> :"Loading..." }
        </ul>
    </div>
  )
}

export  {Place}