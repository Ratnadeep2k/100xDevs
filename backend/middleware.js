
const  jwt = require('jsonwebtoken');
const {JWT_SECRET} = require("./config")

const authMiddleware =(req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.json({
            message: "Invalid Token"
        })
    }

}