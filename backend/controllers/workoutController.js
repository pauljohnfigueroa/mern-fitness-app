const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

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
const getWorkout = async (req, res) => {

    const { id } = req.params
    // check if we have a valid id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such document." })
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(400).json({ error: 'There is no such workout.' })
    }

    res.status(200).json(workout)
}

// Delete a workout
const deleteWorkout = async (req, res) => {

    const { id } = req.params
    // check if we have a valid id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such document." })
    }

    const workout = await Workout.findOneAndDelete({ _id: id })

    if (!workout) {
        return res.status(400).json({ error: 'There is no such workout.' })
    }

    res.status(200).json(workout)
}

// Update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params
    // check if we have a valid id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such document." })
    }

    // we use the spread ... operator, whatever properties are in the req.body will be updated.
    const workout = await Workout.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!workout) {
        return res.status(400).json({ error: 'There is no such workout.' })
    }
    res.status(200).json(workout)
}


module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}