import Joi from "joi";

const ListingSchema = Joi.object({
    listing : Joi.object({
        title : Joi.string().required() , 
        description : Joi.string().required() , 
        image : Joi.string().allow("",null) , 
        price : Joi.number().min(300).required() , 
        country : Joi.string().required() , 
        location : Joi.string().required() , 

    }).required()
}).options({ stripUnknown: true });


const ReviewSchema = Joi.object({
    review : Joi.object({
        rating : Joi.number().min(1).max(5).required() , 
        comment : Joi.string().required() 
    }).required()  
})





export {ListingSchema,ReviewSchema} ;