const express = require('express')

const router = express.Router()

const Potluck = require('./potluck-model')

const restrict = require('../middleware/restrict')

router.get('/', async (req, res, next) => {
    try {
        const potlucks = await Potluck.getAllPotlucks()
        res.status(200).json(potlucks)
    } catch(err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const potluck = await Potluck.getPotluckById(id)
        res.status(200).json(potluck)
    } catch(err) {
        next(err)
    }
})

router.get('/:id/menu', async (req, res, next) => {
    try {
        const { id } = req.params
        const menu = await Potluck.getPotluckMenu(id)
        res.status(200).json(menu)
    } catch(err) {
        next(err)
    }
})

router.get('/:id/guests', async (req, res, next) => {
    try {
        const { id } = req.params
        const guests = await Potluck.getPotluckGuests(id)
        res.status(200).json(guests)
    } catch(err) {
        next(err)
    }
})

router.put('/:id', restrict,  async (req, res, next) => {
    try {
        const { id } = req.params
        const newPotluck = await Potluck.updatePotluck(id, req.body)
        res.status(200).json(newPotluck)
    } catch(err) {
        next(err)
    }
})


module.exports = router