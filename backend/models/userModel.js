const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

}, { timestamps: true })

// static method
// we can not use an arrow function here, otherwise "this" keyword will not work 
userSchema.statics.signup = async function (email, password) {

    // validations
    if (!email || !password) {
        throw Error("All fields are required.")
    }
    // use the validator package
    if (!validator.isEmail(email)) {
        throw Error("Invalid email.")
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password is weak.")
    }

    // check if unique
    const exists = await this.findOne({ email })
    if (exists) {
        throw Error('Email already exists in the database.')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // save
    const user = await this.create({ email, password: hash })

    return user
}

userSchema.statics.login = async function (email, password) {
    // validations
    if (!email || !password) {
        throw Error("All fields are required.")
    }

    // check if email exists
    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Email is incorrect.')
    }

    // compare password and hash
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Password is incorrect.')
    }

    return user
}



module.exports = mongoose.model('User', userSchema)