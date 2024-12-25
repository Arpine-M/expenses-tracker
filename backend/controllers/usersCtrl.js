const asyncHandler = require('express-async-handler');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// User Registration

const usersController = {
    // register
    register: asyncHandler(async(req, res) => {
        const { username, email, password } = req.body;
    // Validate
    if(!username || !email || !password) {
        throw new Error("All fields are mandatory");
    }
    //Check if user already exists
    const userExists = await User.findOne({email});
    if(userExists) {
        throw new Error("User already exists");
    }
    // Hash the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create user and save into db
    const userCreated = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    //Send the response
    res.json({
        username: userCreated.username,
        email: userCreated.email,
        _id: userCreated._id,
       
    });
 }),

    // login
    login: asyncHandler(async(req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({email});
       
        if(!user){
            throw new Error("Invalid login credentials");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            throw new Error("Invalid login credentials");
        }
         const token = jwt.sign({ id: user._id }, "newKey", {
            expiresIn: "30d", 
        });

        res.json({
            message: "Login successful",
            token, 
            id: user._id,
            email: user.email,
            username: user.username,
        });
    }),

    // profile
    profile: asyncHandler(async(req, res) => {

        
        const user = await User.findById("676745a40d8873192cfdb8b7");
        if(!user) {
            throw new Error("User not found");
        }
        res.json({username: user.username, email: user.email});
    }),

    // Change password
    changeUserPassword: asyncHandler(async(req, res) => {

        const {newPassword} = req.body;
        const user = await User.findById(req.user);
        if(!user) {
            throw new Error("User not found");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();


        res.json({message: "Password changed successfully"});
    }),

    // update user profile
    updateUserProfile: asyncHandler(async(req, res) => {
        const {email, username} = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.user, {
            username,
            email,   
        }, {
            new: true,
        });

        res.json({message: "User profile updated successfully", updatedUser});
    }),
       
}

module.exports = usersController;