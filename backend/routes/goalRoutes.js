const express = require('express');

const router = express.Router();
const {getGoal, setGoal, updateGoal, deleteGoal, getGoalBySearch} = require('../controller/goalController');

const protect = require('../middleware/authMiddleware');

router.route('/').get(protect,getGoal).post(protect,setGoal);



// router.get('/', getGoal);

// router.post('/', setGoal);

 router.patch('/:id', protect, updateGoal);

 router.delete('/:id', protect, deleteGoal)
 
 router.get('/search', protect, getGoalBySearch)

 

module.exports = router;