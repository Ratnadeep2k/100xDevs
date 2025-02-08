const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
    username :{
        type: String,
        required: true,
        unique: true,
        trim:true,
        minlength:  3,
        maxlength: 20
    },
    password:{
        type: String,
        required: true,
        trim:true,
        minlength:  8,
        maxlength: 20
    },
    firstname:{
        type: String,
        required: true,
        trim:true,
        minlength:  3,
        maxlength: 20
    },
    lastname:{
        type: String,
        required: true,
        trim:true,
        minlength:  3,
        maxlength: 20
    },
})

const USER = mongoose.model('USER',userSchema);

module.exports={
    
}