const express = require('express')
const router = express.Router()
/**
 * We want to keep this file clean.
 * We want to avoid putting the database logic in this file,
 * we should put it in the controller instead.
 */
const {
    createWorkout,
    getWorkouts
} = require('../controllers/workoutController')

router.get('/', getWorkouts)

router.post('/', createWorkout)

router.get('/:id', (req, res) => {
    res.json({ msg: 'Get a single workout.' })
})

router.delete('/:id', (req, res) => {
    res.json({ msg: 'DELETE a workout.' })
})

router.patch('/:id', (req, res) => {
    res.json({ msg: 'UPDATE a workout.' })
})







module.exports = router