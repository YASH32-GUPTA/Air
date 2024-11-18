import React, { useEffect, useState } from 'react'



// Redux 
import { useSelector } from 'react-redux'


// Components 
import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/header/header'
import { MainNavbar } from '../../components/Navbar/Navbar'
import Icons from '../../components/Category/Icons'
import { useParams } from 'react-router-dom'
import { Places } from '../../components/Places/Places'
import { MainAlert } from '../../components/Alert/MainAlert'

const Category = ({data}) => {

  let alertDetails = useSelector((State)=>State.toolkit.alert)
  const { content } =  useParams()  ; 
  let [ categoryData , setData ] = useState([]) ;

  useEffect(()=>{

     function getCategoryDetails(){

      let selectedData = []  ;
      //  Data selection   
      data.map((place)=>{

        if(place.category == content){
             selectedData.push(place) ;
        }

      })

      setData(selectedData)  ;

    }   

    if(data && data.length > 0 ){
        getCategoryDetails()  ; 
    }

  },[content,data])




  return (
    <div  className='homeScreen'>

        {/* Nav Bar */}
        <MainNavbar/>

        {/* Icons */}
        <Icons/>


        {/* listing details */}
        <Header title={( content ? content : "Adventure Travel")}/>    


        {/* ALERT */}
        { alertDetails ? alertDetails.location == "home" ?  <MainAlert alertDetails={alertDetails}/> : null : null }


        {/* Content Category wise   */}
        <Places  data = {categoryData} />

        
        {/* Footer */}
        <Footer/>
    </div>
  )
}

export default Category