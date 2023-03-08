require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 4001

const workoutRouter = require('./routes/workouts')

// express app
const app = express()

// middleware must be declared before the routes

// this will check for data in the body of the requests then attach it to the req object
// you can use req.body to access the data
app.use(express.json())

app.use((req, res, next) => {
    console.log('middleware #2 fired.')
    next()
})


// a route handler
// app.get('/', (req, res) => {
//     res.json({ msg: 'This is a message from /' })
// })

app.use('/api/workouts', workoutRouter)

// database connection
// process is global variable available in node
// this returns a promise
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // we only want to listen to request after connecting to the database
        console.log('Successfully connected to the Database.')
        app.listen(PORT, () => {
            console.log(`Listening in port ${PORT}`)
        })
    })
    .catch(error => {
        console.error(error)
    })

