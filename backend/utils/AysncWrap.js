let asyncWrap = (fn)=>{
    return function( req , res , next){
        fn( req , res , next ).catch((err)=>next(err)) 
    }
}

export {asyncWrap} ;