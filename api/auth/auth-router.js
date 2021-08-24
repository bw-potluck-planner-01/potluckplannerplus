const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = express.Router()

const checkRequest = require('../middleware/checkRequest')
const checkUsernameUnique = require('../middleware/checkUsernameUnique')
const validateCredentials = require('../middleware/validateCredentials')

const Auth = require('./auth-model')

const { TOKEN_SECRET } = require('../config/secret')
// const HASH_ROUNDS = process.env.HASH_ROUNDS || 8

const createToken = (organizer) => {
    const payload = {
        username: organizer.username,
        password: organizer.password
    }

    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, TOKEN_SECRET, options)
}

router.post('/register', checkRequest, checkUsernameUnique, async (req, res, next) => {
    try {
        const { username, password } = req.body
        const hash = bcrypt.hashSync(password, 8)
        const organizer = {
            username: username,
            password: hash
        }
        const newOrganizer = await Auth.registerOrganizer(organizer)
        res.status(200).json(newOrganizer)
    } catch(err) {
        next(err)
    }
})

router.post('/login', checkRequest, validateCredentials, async (req, res, next) => {
    try {
        const { username } = req.body
        const organizer = await Auth.findByUsername(username)
        const token = createToken(organizer)
        res.status(200).json({ message: `Welcome back, ${organizer.username}`, token})
    } catch(err) {
        next()
    }
})

module.exports = router