// importing express
const express = require('express');

// creating instance of express
const app = express();


// importing mongoose connection
require('./db/connection');


// importing 
const cookieParser = require('cookie-parser');


// import dotenv for env file
const dotenv = require('dotenv');


// importing userRoutes from routes folder
const userRoute = require('./routes/userRoute');


// importing loginRoute from routes
const loginRoute = require('./routes/loginRoute');


// configuration of modules
dotenv.config();


// middleware
app.use(express.json());
app.use(cookieParser())

// routes
app.use("/user", userRoute)
app.use("/login", loginRoute);

// initial route of app
app.get("/",(req,res)=>{
    res.send("hello shreyas");
})


// port of app
const port = process.env.PORT;


// running servers
app.listen(port, ()=>{
    console.log(`listening to port ${port}`);
})
