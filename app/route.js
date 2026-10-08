const authcontroller=require('./controller')
const auth=require('../common/auth')
const { signupschma } = require('../val')
const { signup } = require('../common/valdtion')
const authorization=require('../common/authrzation')
const {Router}=require('express')
const multerLocal=require('../common/multer')

const authRouter=Router()



authRouter.post('/signup',multerLocal({custpath:"user",custtype:["image/png"]}).array("atthment",2),signup(signupschma),authcontroller.signup)
authRouter.post('/signup/gmail',authcontroller.signupeWithGmail)
authRouter.post('/signin',authcontroller.signin)
authRouter.post('/getprofile',auth.authction,authorization.authorization(["admin"]),authcontroller.getProfile)
module.exports=authRouter