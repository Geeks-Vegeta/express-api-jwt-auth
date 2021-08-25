// importing express for creating router
const loginRoute = require('express').Router();

// importing bcrypt
const bcrypt = require('bcryptjs');

// importing jwt
const jwt = require('jsonwebtoken');

// importing 
const userModel = require('../models/userModel');


//  login route
loginRoute.post("/", async(req, res)=>{

    // checking if email exists
    const user = await userModel.findOne({email:req.body.email});
    if(!user) return res.json({"message": "Invalid Email"}).status(404);

    // checking if password exists
    const isValidPassword =await bcrypt.compare(req.body.password, user.password);
    if(!isValidPassword) return res.json({"message": "Invalid Password"}).status(404);

    const token = jwt.sign({"id":user._id}, process.env.SECRET_KEY);
    res.status(200).cookie('auth',token).header('Authorization',token).send(token);

})


// logout
loginRoute.get("/logout", (req,res)=>{
    res.clearCookie("auth",{path:"/"});
    res.status(200).send("logout")
})


// exporting loginRoute
module.exports = loginRoute;