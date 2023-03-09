const express = require('express')
const router = express.Router()
/**
 * We want to keep this file clean.
 * We want to avoid putting the database logic in this file,
 * we should put it in the controller instead.
 */
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

const requireAuth = require('../middleware/requireAuth')
// require authentication for each route
router.use(requireAuth)

router.get('/', getWorkouts)

router.post('/', createWorkout)

router.get('/:id', getWorkout)

router.delete('/:id', deleteWorkout)

router.patch('/:id', updateWorkout)


module.exports = router