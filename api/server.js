const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const restrict = require('./middleware/restrict')

const server = express()

const authRouter = require('./auth/auth-router')
const orgRouter = require('./organizers/org-router')
const potluckRouter = require('./potlucks/potluck-router')
const guestsRouter = require('./guests/guest-router')
const menuRouter = require('./food_items/menu-router')

server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/auth', authRouter)
server.use('/org', restrict, orgRouter)
server.use('/potlucks', potluckRouter)
server.use('/guests', guestsRouter)
server.use('/menu', menuRouter)

// Welcome API

server.get('/', (req, res) => {
  res.send({ message: `Welcome to the PotluckPlannerPlus API!`})
})

// Catch-All Error Handler

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message, stack: err.stack})
})

module.exports = server
