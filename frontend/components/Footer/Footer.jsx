import React from 'react'

// Icons
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// Css
import '../../public/css/footer.css'

const Footer = () => {
  return (
    <div className='mainFooter'>

        <div className="icons space">
                <InstagramIcon className='spaceIcon'/>
                <FacebookIcon className='spaceIcon'/>
                <LinkedInIcon className='spaceIcon'/>
        </div>

        <div className="company space font">
                <p>&copy; Air Private Limited</p>
        </div>

        <div className="terms space font">
           <a href="/privacy"><p>Privacy Terms</p></a>
        </div>


    </div>
  )
}

export {Footer}