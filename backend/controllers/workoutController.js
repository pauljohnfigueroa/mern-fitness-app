const Workout = require('../models/workoutModel')

// Get all workouts.
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 })
    res.status(200).json(workouts)
}

// Create a workout.
const createWorkout = async (req, res) => {
    // title, reps, load are from mongoose schema
    const { title, reps, load } = req.body

    try {
        // create a document
        // database calls a re async
        const workout = await Workout.create({ title, reps, load })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// Get a single workout.

module.exports = {
    createWorkout,
    getWorkouts
}