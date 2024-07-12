import React from 'react'

// Css
import '../../public/css/navbar.css'

// Components 
import {Places} from '../../components/Places/Places'
import { MainNavbar } from '../../components/Navbar/Navbar'
import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/header/header'
import {MainAlert} from '../../components/Alert/MainAlert'
import { useSelector } from 'react-redux'



const HomeScreen = ({data}) => {

  let alertDetails = useSelector((State)=>State.toolkit.alert)
  console.log(alertDetails) ;

  return (
    <div className='homeScreen'>

        {/* Nav Bar */}
        <MainNavbar/>

        {/* listing details */}
        <Header title={"All Listings"}/>        
        {/* Alert  */}
        { alertDetails ? alertDetails.location == "home" ?  <MainAlert alertDetails={alertDetails}/> : null : null }
        <Places data = {data} />
        {/* Footer */}
        <Footer/>
        
    </div>
  )
}

export  {HomeScreen}