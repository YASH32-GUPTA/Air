  import React, { useEffect, useRef, useState } from 'react'
  import ChatsUserEnd from './ChatsUserEnd'
  import ChatsReceiverEnd from './ChatsReceiverEnd'


  import Form from 'react-bootstrap/Form';
  import SendIcon from '@mui/icons-material/Send';
  import { useDispatch, useSelector } from 'react-redux';
  import axios, { all } from 'axios';
  import { useNavigate } from 'react-router-dom';
  import { fetchError, refreshPage,setNewMessageLoad, setPrevMessages } from '../../features/toolkit';
  import { isLoggedWithDetails } from '../Authentication/IsLogginIn';
  import { Emoji } from './Emoji';
  import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';  // css 
  import '../../public/css/chatting.css'
  

 // Emoji

  const Chatting = () => {

    let id = useSelector((State)=>State.toolkit.getReceiverId) ;
    let refresh = useSelector((State)=>State.toolkit.refresh) ;
    let socket  = useSelector((State)=>State.toolkit.socket) ;
    let allMessage  = useSelector((State)=>State.toolkit.allPrevMessages) ;
    let newMessageLoad = useSelector((State)=>State.toolkit.newMessageLoad) ;
    let receiverInfo = useSelector((State)=>State.toolkit.getUserStatus) ;

    const dispatch = useDispatch() ;
    const navigate = useNavigate()  ;

    const [ currentUser , setUser ] = useState({}) ; 
    const [ input , setInput ] = useState("") ;




    // Getting Initial Data 
    useEffect(()=>{
      async function getReceiverChats(){
        let response = (await axios.get(`http://localhost:8080/message/${id}`,{withCredentials : true })).data ; 
        let loggedUserDetails = await isLoggedWithDetails() ; 


        if(loggedUserDetails && loggedUserDetails.loggedIn){

          if( response.get ){
            if( response.data ){
              dispatch(setPrevMessages((response.data.messages))) ;
              setUser(loggedUserDetails.user) ;
            }
            else{
              dispatch(setPrevMessages([])) ;
            }

            }
            else{
              dispatch(fetchError(response)) ;
              navigate("/error") ;
            }
        }


      }

      if(id) {    getReceiverChats() ; }

    },[id,refresh])


    useEffect(()=>{

        if( socket ){
          socket.on("newMessage", (newMessage)=>{
              dispatch(setPrevMessages([...allMessage,newMessage])) ;
          })
          }
          else{
            console.log("socket did not run ")
          }  
    },[socket,allMessage])


     // Ref to the end of messages
   const endOfMessagesRef = useRef(null);

    // Auto-scroll effect
    useEffect(() => {
      if (endOfMessagesRef.current) {
        endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth'});
      }
    }, [allMessage]);


    async function handleSubmit(event){

      event.preventDefault() ; 
      event.stopPropagation();

      try{
        let response = (await axios.post(`http://localhost:8080/message/send/${id}`,{message : input},{withCredentials : true })).data ; 

        if( response.get ){
          dispatch(refreshPage()) ;
          dispatch(setNewMessageLoad(true)) ;
        }
        else{
          dispatch(fetchError(response)) ;
          navigate("/error") ;
        }
      }
      catch(err){
        console.log("Error" , err  ) ;
      }

      // After Submit Input Become Empty !  : 
      setInput("") ;
      
    }

    function handleInput(event){
        console.log(event.target.value) ;
        setInput(event.target.value) ;
    }

    function handleEmoji(){
      
    }

    return (
      <div className='mainChattingBox'>
      <div className="chatArea scrollChat">
          
          {
            allMessage.length > 0 ? 
              <>
                {
                  allMessage.map((chat,idx)=>{
                  return( 
                    <React.Fragment key={idx}>
                    {  
                      idx == allMessage.length - 1 && newMessageLoad
                      ?
                      chat.senderId == currentUser._id ? <ChatsUserEnd chat ={chat} currentUser = {currentUser} newMessageLoad = {newMessageLoad}/> : <ChatsReceiverEnd chat ={chat}   receiver = {receiverInfo}/>  
                      :
                      chat.senderId == currentUser._id ? <ChatsUserEnd chat ={chat} currentUser = {currentUser} newMessageLoad = {false}/> : <ChatsReceiverEnd chat ={chat}  receiver = {receiverInfo}/>  
                      
                    }
                    </React.Fragment>
                  )
                  })
                }
                <div ref={endOfMessagesRef} />
              </>
            :
            <div className='emptyChat font'><h2><b>Start your first conversation...</b></h2></div>
          }

        </div>

      {/* User Input's */}
      <div className="userChat">
              <div className="userInput">

                  <form className='formInput' onSubmit={(e)=>handleSubmit(e)} style={{width : "100%"}}>
                      <Form.Control size="lg" type="text" placeholder="Write a message..."  name = "input" value={input} onChange={(e)=>handleInput(e)}/>

                    <button type='submit' style={{ 
                      background: 'none', 
                      border: 'none', 
                      padding: '0', 
                      cursor: 'pointer', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      marginLeft : "2%"
                    }}>

                      <span className='sendIcon' onClick={handleEmoji}> <EmojiEmotionsIcon/></span>

                    </button>
                      

                      <button type='submit' style={{ 
                      background: 'none', 
                      border: 'none', 
                      padding: '0', 
                      cursor: 'pointer', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      marginLeft : "2%"
                    }}>

                      <span className='sendIcon'> <SendIcon/></span>

                    </button>

                  </form>

              </div>
      </div>


      </div>
    )
  }

  export  {Chatting}