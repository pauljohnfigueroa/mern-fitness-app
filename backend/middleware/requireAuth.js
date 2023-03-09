const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const requireAuth = async (req, res, next) => {
    // verify if user is authenticated
    const { authorization } = req.headers

    if (!authorization) {
        res.status(401).json({ error: "Authorization required." })
    }

    // if there is a token
    const token = authorization.split(' ')[1]

    try {
        // verify if the token is valid then get the _id
        const { _id } = jwt.verify(token, process.env.SECRET)
        // we chain select('_id) to get just the _id and not all user document
        req.user = await User.findOne({ _id }).select('_id')
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({ error: "Unauthorized." })
    }

}

module.exports = requireAuth