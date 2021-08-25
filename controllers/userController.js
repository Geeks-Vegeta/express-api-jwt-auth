
// importing userModels from models folder
const userModel = require('../models/userModel');

// importing bcryptjs
const bcrypt = require('bcryptjs');


// getting all users
const getAllUsers = async(req,res) => {

    try {
        const users = await userModel.find();
        res.send(users);
        
    } catch (error) {
        console.log(error)
        
    }

}



// adding a new user
const createNewUser = async(req, res) =>{

    // checking if user name is already exists
    const name = await userModel.findOne({name:req.body.name});
    if(name) return res.json({"message": "UserName is already taken, please try another one"}).status(404);


    // checking if email already exists
    const email = await userModel.findOne({email:req.body.email});
    if(email) return res.json({"message": "Email already Exists, please try another one"}).status(404);


    // checking if two password are same
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if(password !== confirmPassword) return res.json({"message": "Password does not match"}).status(404);


    // hasing password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);


    try {

        const user = userModel({
            "name":req.body.name,
            "email":req.body.email,
            "address":req.body.address,
            "password":hashPassword,
            "confirmPassword":hashPassword
        })

        await user.save();
        res.send(user).status(201);
        
    } catch (error) {
        console.log(error)
        
    }
}




// current user
const currentUser = async(req, res)=>{

    const _id = req.name.id;

    const user = await userModel.findById(_id);
    
    res.send(user);

    

}



// update user function
const updateUser = async(req, res)=>{

    const _id = req.name.id;

    try {
        const isIdExists = await userModel.findById(_id);

        if(!isIdExists) return res.json({"message": "user is not present cant'update"}).status(400);

        const user = await userModel.findByIdAndUpdate({_id}, req.body, {new:true});
        res.send(user)
        
    } catch (error) {
        res.send(error)
        
    }

}


// deleting user

const deleteUser = async(req, res) => {

    try {
        
        // getting user from loginAuth
        const _id = req.name.id;

        // checking if user id is exists
        const isIdExists = await userModel.findById(_id);
        if(!isIdExists) return res.json({"message": "Id does not exist sorry can't delete"}).status(400);

        // deleting user
        await userModel.findByIdAndDelete(_id).then(()=>{
            res.json({"message": "user deleted successfully"});
        })
       
        
    } catch (error) {
        res.send(error)
        
    }
}

module.exports = {
    getAllUsers, createNewUser, updateUser, deleteUser, currentUser
};