

function roundOff( val , totalLength ){
    return Math.floor((val / totalLength)*100)/100 ;
}

function getAvgRating(placeDetail){

    let sum = 0  ;

    placeDetail.reviews.map((data)=>{
        sum+=data.rating ;
    }) ; 

    return roundOff(sum , placeDetail.reviews.length) ; 

} 


function getIndividualRating(placeDetail){
    let ratingData = { one : 0 , two : 0 , three : 0 , four : 0 , five : 0 }; 

    placeDetail.reviews.map((data)=>{
        switch(data.rating){
            case 1 : ratingData.one++ ; break ; 
            case 2 : ratingData.two++ ; break ; 
            case 3 : ratingData.three++ ; break ; 
            case 4 : ratingData.four++ ; break ; 
            case 5 : ratingData.five++ ; break ; 
        }
    }) ;

    return filteredData(ratingData,placeDetail.reviews.length) ;

}


function filteredData(ratingData,totalLength){

    let filterData  = [] ;


    if(ratingData.one){
        filterData.push({ id : 0 , value : (ratingData.one/totalLength)*100 , label: `1 ★`})
    }
    if(ratingData.two){
        filterData.push({ id : 1 , value : (ratingData.two/totalLength)*100 , label: '2 ★★'})
    }
    if(ratingData.three){
        filterData.push({ id : 2 , value : (ratingData.three/totalLength)*100 , label: '3 ★★★'})
    }
    if(ratingData.four){
        filterData.push({ id : 3 , value : (ratingData.four/totalLength)*100 , label: '4 ★★★★'})
    }
    if(ratingData.five){
        filterData.push({ id : 4 , value : (ratingData.five/totalLength)*100 , label: '5 ★★★★★'})
    }



    return filterData ;
}




export { getAvgRating , getIndividualRating }