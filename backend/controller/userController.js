const express = require('express');
const mongoose = require('mongoose');

const User = require('../models/userModel');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');


// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error('Please fill all fields');
    }

    const userExists = await User.findOne({email});
    
    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassowrd = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassowrd,
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),     
        })
    }
    else{
        res.status(400);
        throw new Error('Invalid user data');
    }

    res.json({message: 'Register user'});
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getUserData = asyncHandler(async (req, res) => {
    const {id, name, email} = await User.findById(req.user._id);
    
    res.status(200).json({
        _id: id,
        name,
        email,
    })
})


// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),

        })
    }
    else{
        res.status(401);
        throw new Error('Invalid email or password');
    }

    res.json({message: 'Login user'});
})

const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    getUserData,
    loginUser
}