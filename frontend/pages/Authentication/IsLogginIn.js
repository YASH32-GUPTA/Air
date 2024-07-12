import axios from 'axios'


async function isLogged(){

  let response = (await axios.get(`http://localhost:8080/islog`,{ withCredentials: true })).data ;
  console.log("session",response) ;
  if(response.loggedIn == true){
    return true  ;
  }
  else{
    return false ; 
  }

}



async function isLoggedWithDetails(){

  let response = (await axios.get(`http://localhost:8080/islog`,{ withCredentials: true })).data ;
  console.log("session",response) ;
  if(response.loggedIn == true){
    return response  ;
  }
  else{
    return null ; 
  }

}

export {isLogged ,isLoggedWithDetails} ; 



