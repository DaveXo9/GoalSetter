const express = require('express');
const mongoose = require('mongoose');

const Goal = require('../models/goalsModel');

const asyncHandler = require('express-async-handler');

const router = express.Router();
// For try and catch you can use only async

//@desc get goals
// @route GET /api/goals
// @access Private
const getGoal = asyncHandler(async (req,res) =>{
    const goals = await Goal.find()
    res.status(200).json(goals)
})

//@desc set goals
// @route POST /api/goals
// @access Private
const setGoal =asyncHandler(async (req,res) =>{
   if(!req.body.text){
    res.status(400)
    throw new Error('Please add a goal')
   }
   const goal = await Goal.create({
    text: req.body.text,
   })
   res.status(200).json(goal)
})
//@desc update goals
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req,res) =>{
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(404)
        throw new Error('Goal not found')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedGoal)
})
//@desc delete goals
// @route DELETE /api/goals
// @access Private
const deleteGoal = asyncHandler(async (req,res) =>{
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(404)
        throw new Error('Goal not found')
    }
    await goal.remove()

    res.status(200).json({id:req.params.id})
})

module.exports = {getGoal, setGoal, updateGoal, deleteGoal}