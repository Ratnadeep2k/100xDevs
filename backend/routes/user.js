const express = require('express');
const router = express.Router();
const zod = require('zod');
const jwt = require('jesonwebtoken');
const JWT_SECRET = require('../config');


const signupSchema = zod.object({
    username: zod.string().min(3).max(20),
    password: zod.string().min(8).max(20),
    firstname: zod.string().min(3).max(20),
    lastname: zod.string().min(3).max(20),
});
router.post("/signup",async(req,res)=>{
    const body = req.body;
    const {success} = signupSchema.safeParse(req.body);

    if(!success){
        return res.json({
            message: "Invalid Data"
        })
    }

    const user =User.findOne({
        username: body.username
    })
    if(user._id){
        return res.json({
            message: "User already exists"
        })
    }

    const dbuser= await User.create(
        body
    )
    const token = jwt.sign({
        userId: dbuser._id
    },JWT_SECRET)
    res.json({
        message: "User Created",
        userToken : token
    })

})