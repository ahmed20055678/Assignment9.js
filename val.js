const joi=require('joi')
const signupschma={
        body:joi.object({
            fName:joi.string().required(),
            lName:joi.string().required(),
            email:joi.string().required(),
            password:joi.string().required(),
            age: joi.number().required(),
            phone: joi.string().required()
        }).required(),
        query:joi.object({
            flags:joi.string().required(),
        })
    }

module.exports={signupschma}