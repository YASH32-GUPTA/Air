import React from 'react'
import { useState , useEffect } from 'react';

// Css
import '../../public/css/places.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

// Components
import {Place} from './Place';

import { useSelector , useDispatch } from 'react-redux'
import { refreshMainPage, setAlert , setShow } from '../../features/toolkit';

const Places = ({data}) => {
  const dispatch = useDispatch() ;
  const [ placesData , setData ]  = useState([{}]) ; 
  let [ showSearchData , setSearchData ]  = useState([]) ; 


  let searchValue = useSelector((State)=> State.toolkit.searchValue) 


  useEffect(()=>{
    function getPlaceBySearch(){
      showSearchData = placesData ; 
      let searchData = [] ;  let userSearch ;
      let found = false ; 
      placesData.map(
        (data)=>{
        userSearch = searchValue.trim().split(" ").join("").toString().toLowerCase() ;
        let place = data.title.trim().split(" ").join("").toString().toLowerCase() ;
        let shortSearch =  place.slice(0,userSearch.length) ;

      
        
        if( userSearch == shortSearch ){
           found = true ; 
           searchData.push(data) ;
        }

      }); 

      if( found == false  ){
        setSearchData([]) ;
        searchData = [] ; 
        dispatch(setShow(false)) ; 
        dispatch(setAlert({ status: false, msg: `No Place Found With Value ${userSearch}`, location: "home" }));
      }

      if( searchData.length > 0  ){
          dispatch(setShow(true)) ;
          setSearchData(searchData) ;
      } 
    }


    if(searchValue){
      getPlaceBySearch() ;
    }
    else{
      setSearchData([]) ;
      dispatch(setShow(false)) ;
      dispatch(refreshMainPage()) ;
    }

  },[searchValue])

  useEffect(()=>{
    setData(data) ;
  },[data]) ;

  return (
    <Container fluid>
      <Row>
    <div className='places '>
      {
        showSearchData && showSearchData.length > 0 ? 
        showSearchData.map((data,idx)=>(
          <Place key={idx} place = {data}/>
       ))
       :
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