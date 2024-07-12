import React from 'react'
import { useState , useEffect } from 'react';

// Css
import '../../public/css/places.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

// Components
import {Place} from './Place';

const Places = ({data}) => {

  const [ placesData , setData ]  = useState([{}]) ; 

  useEffect(()=>{
    setData(data) ;
  },[data]) ;

  return (
    <Container fluid>
      <Row>
    <div className='places '>
      {
        placesData.map((data,idx)=>(
           <Place key={idx} place = {data}/>
        ))
      }
    </div>
    </Row>
   </Container>
  )
}

export {Places}