const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Account} = require('../db');

router.get('/balance',async (req,res)=>{
  const account = await Account.findOne({
    userId: req.userId
  });
  res.json({
    balance: account.balance
  })
})

router.post('/transfer',async (req,res)=>{
     const session = await mongoose.startSession();
     session.startTransaction();

     const {amount,to} = req.body;

     const account = await Account.findOne({
       userId: req.userId
     }).session(session);

     if(!account || account.balance< amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient Funds"
        })
     }
     const toAccount = await Account.findOne({
        userId: to
     }).session(session);

        if(!toAccount){
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid Recipient"
            })
        }
        //perfrom transection 
        await Account.updateOne({
            userId: req.userId
        }, { $inc: {balance: -amount}}).session(session);
        await Account.updateOne({
        userId: to
    }, { $inc: {balance: amount}}).session(session);

    await session.commitTransaction();
    res.json({
        message: "Transfer Successful"
    });
})



module.exports = router;