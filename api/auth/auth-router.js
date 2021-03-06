const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = express.Router()

const checkOrgReqBody = require('../middleware/checkOrgReqBody')
const checkUsernameUnique = require('../middleware/checkUsernameUnique')
const validateCredentials = require('../middleware/validateCredentials')
const restrict = require('../middleware/restrict')

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

router.get('/organizers', restrict,  async (req, res, next) => {
    try {
        const organizers = await Auth.getOrganizers()
        res.status(200).json(organizers)
    } catch(err) {
        next(err)
    }
})

router.post('/register', checkOrgReqBody, checkUsernameUnique, async (req, res, next) => {
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

router.post('/login', checkOrgReqBody, validateCredentials, async (req, res, next) => {
    try {
        const { username } = req.body
        const organizer = await Auth.findByUsername(username)
        const token = createToken(organizer)
        res.status(200).json({ message: `Welcome back, ${organizer.username}`, token, organizer_id: organizer.organizer_id})
    } catch(err) {
        next()
    }
})

router.get('/logout', restrict, (req, res, next) => {
    const token = req.headers.authorization
    jwt.sign({token: token}, 'shh', { expiresIn: 1 }, (err, logout) => {
        if(err) {
            next({ status: 500, message: 'Could not log you out.', stack: err.stack, err: err.message})
        } else {
            res.status(200).json({ message: 'You have been logged out. Catch ya next time!'})
        }
    })
})


module.exports = router