// importing mongoose
const mongoose = require('mongoose');

// creating user schema
const userSchema = mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    }
});

// user model created
const userModel = mongoose.model("user", userSchema);

// exporting userModel
module.exports = userModel;
