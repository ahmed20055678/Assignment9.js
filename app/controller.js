const authservsi=require('./servsi')
const {Encrypt,Decrypt}=require('../common/encrep')
const {Hash,CompareHash}=require('../common/hash')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client();
const signup=async(req,res,next)=>{
    try{
        const paths=[]
        for (const file of req.files) {
            paths.push(file.path)
        }
        
        const{email,fName,lName,password,age,gender,phone}=req.body
        const user=await authservsi.signup({email,fName,lName,password:await Hash(password,10),age,gender,phone:Encrypt(phone),coverImage:paths})
        res.json({
            message:"user add successfully",
            data:user, 
            
        })
    }catch(err){
        next(err)
    }
}
const signin=async(req,res,next)=>{
    try{
        const{email,password}=req.body
        const user=await authservsi.signin(email,password)
        res.json({
            message:"user signin",
            tokens:{
        accessToken: user.accessToken,
        refreshToken: user.refreshToken
            }
        })
    }catch(err){
        next(err)
    }
}
const signupeWithGmail=async(req,res,next)=>{
    try{
        const{idToken}=req.body
        const decode = await client.verifyIdToken({
        idToken,
        audience: "419188861713-6pj8ssf3cfb8e37o94mqfm07uj5hfok9.apps.googleusercontent.com",
    });
        const {email,given_name,family_name,picture,email_verified} = decode.getPayload();
        user=await authservsi.signupeWithGmail({email,given_name,family_name,picture,email_verified},idToken)
    }catch(err){
        next(err)
    }
}
const getProfile=async(req,res,next)=>{
    try{
        res.json({
            message:"user signin",
            data:req.user
        })
    }catch(err){
        next(err)
    }
}
module.exports={signup,signin,getProfile,signupeWithGmail}