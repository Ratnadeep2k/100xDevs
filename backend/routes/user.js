const express = require('express');
const router = express.Router();
const zod = require('zod');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config');
const authMiddleware = require('../middleware');
const { User, Account } = require('../db');

const signupSchema = zod.object({
    username: zod.string().min(3).max(20),
    password: zod.string().min(8).max(20),
    firstname: zod.string().min(3).max(20),
    lastname: zod.string().min(3).max(20),
});

router.post("/signup", async (req, res) => {
    try {
        const body = req.body;
        const { success, error } = signupSchema.safeParse(req.body);

        if (!success) {
            console.log("Invalid Data:", error);
            return res.json({
                message: "Invalid Data"
            });
        }

        const user = await User.findOne({
            username: req.body.username
        });

        if (user && user._id) {
            return res.json({
                message: "User already exists"
            });
        }

        const dbuser = await User.create(body);

        await Account.create({
            userId: dbuser._id,
            balance: 1 + Math.random() * 10000
        });

        const token = jwt.sign({
            userId: dbuser._id
        }, JWT_SECRET);

        res.json({
            message: "User Created",
            userToken: token
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
});

const signinBody = zod.object({
    username: zod.string(),
    password: zod.string()
});

router.post('/signin', async (req, res) => {
    const { success } = signinBody.safeParse(req.body);

    if (!success) {
        return res.json({
            message: "Invalid Data"
        });
    }

    const checkUser = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (checkUser) {
        const token = jwt.sign({
            userId: checkUser._id
        }, JWT_SECRET);

        return res.json({
            message: "User Signed In",
            userToken: token
        });
    }

    res.json({
        message: "Invalid username or password"
    });
});

const updateBody = zod.object({
    password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional()
});

router.put('/update', authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        return res.json({
            message: "Error while updating the data"
        });
    }
    await User.updateOne(req.body, {
        id: req.userId
    });
    res.json({
        message: "User Updated"
    });
});

router.get('/filter', async (req, res) => {
    const filter = req.query.filter || '';
    const users = await User.find({
        $or: [
            {
                firstname: {
                    '$regex': filter,
                }
            },
            {
                lastname: {
                    '$regex': filter
                }
            }
        ]
    });
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    });
});

module.exports = router;