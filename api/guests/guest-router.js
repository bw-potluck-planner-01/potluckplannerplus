const express = require('express')

const router = express.Router()

const Guest = require('./guest-model')

const restrict = require('../middleware/restrict')

router.put('/:id', restrict, async (req, res, next) => {
    try {
        const { id } = req.params
        const newGuest = await Guest.updateGuest(id, req.body)
        res.status(200).json(newGuest)
    } catch(err) {
        next(err)
    }
})

router.delete('/:id', restrict, async (req, res, next) => {
    try {
        const { id } = req.params
        await Guest.deleteGuest(id)
        res.status(200).json({ message: 'Guest has been deleted.'})
    } catch(err) {
        next(err)
    }
})

module.exports = router