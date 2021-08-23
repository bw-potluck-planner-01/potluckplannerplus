const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const server = express()

const authRouter = require('./auth/auth-router')

server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/auth', authRouter)

// Catch-All Error Handler

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message, stack: err.stack})
})

module.exports = server
