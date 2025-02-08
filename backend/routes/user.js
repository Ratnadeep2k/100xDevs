const express = require('express');
const router = express.Router();
const zod = require('zod');
const jwt = require('jesonwebtoken');
const JWT_SECRET = require('../config');
const authMiddleware = require('../middleware');

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
        username: req.body.username
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

const signinBody = zod.object({
    username: zod.string(),
    password: zod.string()

})

const signin  = router.post('/signin',async(req,res)=>{
    const {success} = signinBody.safeParse(req.body);

    if(!success){
        return res.json({
            message: "Invalid Data"
        })
    }
    const  checkUser = await User.findOne({
        username: req.body.username,
        password: req.body.password
    }
)
if(checkUser){
  const token = jwt.sign({
    userId: checkUser._id
  },JWT_SECRET)
}

res.json({
    message: "User Signed In",
    userToken : token
})

})

const updateBody = zod.object({
    password :zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional()
})
router.put('/update',authMiddleware,async(req,res)=>{
    const {success} = updateBody.safeParse(req.body);
    if(!success){
        return res.json({
            message: "Error while updating the data"
        })
    }
     await User.updateOne(req.body,{
        id: req.userId
    })
    res.json({
        message: "User Updated"
    })
})

router.get('/filter',async (req,res)=>{

    const  filter = req.query.filter || '';
    const users =await User.find({
        $or:[{
            firstname:{
                '$regex':filter,
            }
        },
        {
            lastname:{
                '$regex':filter
            }
        }
    ]
    })
    res.json({
        user:users.map(user=>({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })

})