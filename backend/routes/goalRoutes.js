const express = require('express');

const router = express.Router();
const {getGoal, setGoal, updateGoal, deleteGoal} = require('../controller/goalController');

router.route('/').getGoal(getGoal).post(setGoal);

router.route('/:id').put(updateGoal).delete(deleteGoal);

// router.get('/', getGoal);

// router.post('/', setGoal);

// router.put('/:id', updateGoal);

// router.delete('/:id', deleteGoal)

module.exports = router;