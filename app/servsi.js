const authres=require('./res')
const jwt=require('jsonwebtoken')
const {Hash,CompareHash}=require('../common/hash')
const signup=async(data)=>{
    const {email}=data
    const user=await authres.findByEmail(email)
    if(user){
        throw new Error("user already exiest")
    }
    return await authres.createUser(data)
}
const signin=async(email,password)=>{
    user=await authres.findByEmail(email)
    if(!user){
        throw new Error("user not found")
    }
    if(! await CompareHash(password,user.password)){
        throw new Error("password not correct")
    }
    const accessToken=jwt.sign({id:user._id,email:user.email,role: user.role},"ahmed123",{
        expiresIn:60*2,
        notBefore:0,

    })
    const refreshToken=jwt.sign({id:user._id},"ahmed123")
    return {user,accessToken,refreshToken}
}
const getProfile=async(authhead)=>{
    if(!authhead){
        throw new Error("token not send")
    }
    const [type,token]=authhead.split(" ")
    if (type !== "Bearer") {
            throw new Error("Bearer token required")
    }
    const decode=jwt.verify(token,"ahmed123")
    const user=await authres.findByEmail(decode.email)
    if(!user){
        throw new Error("user not found")
    }
    return decode

}
const signupeWithGmail=async(data,idToken)=>{
    let user=await authres.findByEmail(data.email)
    if(!user){
        user= await authres.createUser({
            email:data.email,
            fName:data.given_name,
            lName:data.family_name,
            profileImage:data.picture,
            isConfirmed:data.email_verified,
            role:data.role,
            provider:"google"
        })
        if(user.provider=="system"){
            throw new Error("user already exiest")
        }
        const accessToken=jwt.sign({id:user._id,email:user.email},"ahmed123",{
        expiresIn:60*2,
        notBefore:30,
        
        })
        const refreshToken=jwt.sign({id:user._id},"ahmed123")
    }
    return {user}
}
module.exports={signup,signin,getProfile,signupeWithGmail}