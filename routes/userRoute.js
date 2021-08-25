//  creating router
const userRoute = require('express').Router();


// importing loginAuth from middleware
const loginAuth = require('../middleware/loginAuth');


//  import userController
const userController = require('../controllers/userController');

// getting allusers
userRoute.get("/getalluser", userController.getAllUsers);

// adding new user
userRoute.post("/createnewuser", userController.createNewUser);

// updating user
userRoute.put("/updateuser", loginAuth, userController.updateUser);

// delete user
userRoute.delete("/deleteuser", loginAuth, userController.deleteUser);

// getting current user
userRoute.get("/currentuser", loginAuth, userController.currentUser)


// exporting userRoutes
module.exports = userRoute;
