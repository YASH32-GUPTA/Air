// css 
import '../../public/css/chat.css'

//  Components 
import { MainNavbar } from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer/Footer';
import ChatSearchBar from './ChatSearchBar';
import {Chatting} from './Chatting';
import {UsersBox} from './UsersBox';
import { ChatStatusHead } from './chatStatusHead';


export default function Chat() {


  

  return (
    <div className="homeScreen">

    {/* Nav Bar */}
    <MainNavbar/>

    <div className="chatApp ">        

        {/* user section */}
        <div className="userSection font scrollChat">

            <div className="userSectionHeader">
                 <h1 className='customSpace'><b>Chats</b></h1>
                 <ChatSearchBar/>
            </div>

            <div className="userListSection">
                <UsersBox/>
            </div>


        </div>


        {/* Chat Secction  */}
        <div className="chatSection">

             <div className="userStatus">

                 <ChatStatusHead/>
                
             </div>

             <div className="content">

                {/* Chatting section  */}
                <Chatting/>


             </div>


          

        </div>

    </div>


    
   {/* Footer */}
   <Footer/>

        
    </div>
  );
}
  