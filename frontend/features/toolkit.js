import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    refresh : 0 , 
    mainPageRefresh : 0 , 
    givePlaceDetails : [] ,
    error : {} ,
    alert : {
        status : null , 
        msg : "",
        location : "" ,
    }
    ,
    currentUser : {} ,
    searchValue : "" ,
    show : null , 
    category : "",
    getUserStatus : {}  , // These are for message Part 
    getReceiverId : "" ,
    checkAuth : 0 ,
    // For socket , 
    socket : null , 
    getOnlineUsers : [] ,
    allPrevMessages : [] ,
    newMessageLoad : false 
} ; 


const toolkit = createSlice({
    name : "toolkit" , 
    initialState  , 
    reducers : {
        refreshPage(state ){
            state.refresh++  ;         
        }
        ,
        refreshMainPage(state ){
            state.mainPageRefresh++ ; 
        }
        ,
        giveDetails(state , action ){
            state.givePlaceDetails = action.payload ; 
        }
        ,
        fetchError(state , action ){
            state.error = action.payload ; 
        }
        ,
        setAlert(state , action ){
            state.alert = action.payload ; 
        }
        ,
        getCurrentDetails(state,action){
            state.currentUser = action.payload ; 
        }
        ,
        getSearchValue(state , action ){
            state.searchValue = action.payload ; 
        }
        ,
        setShow(state , action ){
            state.show =  action.payload ? action.payload : false  ; 
        }
        ,
        setCategory(state , action ){
            state.category = action.payload ; 
        }
        ,
        setChatUserStatus( state , action  ){
            state.getUserStatus = action.payload ; 
        }
        ,
        setReceiverId( state , action ){
            state.getReceiverId = action.payload ; 
        }
        ,
        setAuth( state  ){
            state.checkAuth ++  ;
        }
        ,
        setSocket(state , action){
            state.socket = action.payload ;
        }
        ,
        setOnlineUsers(state , action){
            state.getOnlineUsers = action.payload ; 
        }
        ,
        setPrevMessages(state , action ){
            state.allPrevMessages = action.payload ;
        }
        ,
        setNewMessageLoad( state , action ){
            state.newMessageLoad = action.payload ; 
        }
    }

})


export const { refreshPage ,  giveDetails ,fetchError, refreshMainPage , setAlert  , getCurrentDetails , getSearchValue , setShow , setCategory , setChatUserStatus , setReceiverId , setAuth , setOnlineUsers , setSocket , setPrevMessages , setNewMessageLoad} = toolkit.actions ; 
export default toolkit.reducer; 

