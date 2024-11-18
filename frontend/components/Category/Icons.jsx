import React from 'react'
   
import '../../public/css/category.css'
// Icons
import HikingIcon from '@mui/icons-material/Hiking';
import FestivalIcon from '@mui/icons-material/Festival';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { useNavigate } from 'react-router-dom';

const Icons = () => {

  const navigate  = useNavigate()  ;

  function handleClick(content){
    navigate(`/category/${content}`)
  }

  return (
    <div className='header font iconBox'>
        <div className="icon" onClick={()=>handleClick("Adventure Travel")} >
            <HikingIcon/>
            <p>Adventure Travel</p>
        </div>
        <div className="icon" onClick={()=>handleClick("Cultural Travel")}>
            <FestivalIcon/>
            <p>Cultural Travel</p>
        </div> <div className="icon" onClick={()=>handleClick("Luxury Travel")}>
            <AttachMoneyIcon/>
            <p>Luxury Travel</p>
        </div> <div className="icon" onClick={()=>handleClick("Eco-Tourism")}>
            <Diversity3Icon/>
            <p>Eco-Tourism</p>
        </div> 
        <div className="icon" onClick={()=>handleClick("Family Travel")}>
            <FamilyRestroomIcon />
            <p>Family Travel</p>
        </div>
    </div>
  )
}

export default Icons