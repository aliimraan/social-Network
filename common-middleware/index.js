const jwt=require('jsonwebtoken');
require('dotenv').config()

exports.authenticate=(req,res,next)=>{
    const tokenHeader=req.headers.jwt_react
    console.log("tokenHeader",tokenHeader)
    
    jwt.verify(tokenHeader,process.env.JWT_AUTH,(err,decode)=>{
        console.log(decode)
    if (err){
        return res.status(401).json({'msg':'unauthorize'})
    }
    req.user=decode
    next()
    })
}