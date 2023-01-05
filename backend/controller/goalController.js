const express = require('express');
const mongoose = require('mongoose');

const asyncHandler = require('express-async-handler');

const router = express.Router();
// For try and catch you can use only async

//@desc get goals
// @route GET /api/goals
// @access Private
const getGoal = asyncHandler(async (req,res) =>{
    res.status(200).json({message: 'Get goals'})
})

//@desc set goals
// @route POST /api/goals
// @access Private
const setGoal =asyncHandler(async (req,res) =>{
   if(!req.body.text){
    res.status(400)
    throw new Error('Please add a goal')
   }
   res.status(200).json({message: 'Set goals'})
})
//@desc update goals
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req,res) =>{
    res.status(200).json({message: `Update goal ${req.params.id}`})
})
//@desc delete goals
// @route DELETE /api/goals
// @access Private
const deleteGoal = asyncHandler(async (req,res) =>{
    res.status(200).json({message: `Delete goal ${req.params.id}`})
})

module.exports = {getGoal, setGoal, updateGoal, deleteGoal}