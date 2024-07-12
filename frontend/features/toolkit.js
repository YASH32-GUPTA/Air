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
    currentUser : {}
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
    }
})


export const { refreshPage ,  giveDetails ,fetchError, refreshMainPage , setAlert  , getCurrentDetails} = toolkit.actions ; 
export default toolkit.reducer; 

