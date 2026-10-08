const authservsi = require('../app/servsi')
const authction=async(req,res,next)=>{
    try{
    const authhead=req.headers.authorization
    const user=await authservsi.getProfile(authhead)
    req.user=user
    next()
    }catch(err){
        next(err)
    }
}

module.exports={authction}