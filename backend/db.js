const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ratnadeep:TC1gcwVD1OkZ9N9U@cluster0.p8skk.mongodb.net/paytm')
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