const express = require('express')

const router = express.Router()

const Potluck = require('./potluck-model')

const restrict = require('../middleware/restrict')

const checkPotluckExists = require('../middleware/checkPotluckExists')

router.get('/', async (req, res, next) => {
    try {
        const potlucks = await Potluck.getAllPotlucks()
        res.status(200).json(potlucks)
    } catch(err) {
        next(err)
    }
})

router.get('/:id', checkPotluckExists, async (req, res, next) => {
    try {
        const { id } = req.params
        const potluck = await Potluck.getPotluckById(id)
        res.status(200).json(potluck)
    } catch(err) {
        next(err)
    }
})

router.get('/:id/menu', checkPotluckExists, async (req, res, next) => {
    try {
        const { id } = req.params
        const menu = await Potluck.getPotluckMenu(id)
        res.status(200).json(menu)
    } catch(err) {
        next(err)
    }
})

router.get('/:id/guests', checkPotluckExists, async (req, res, next) => {
    try {
        const { id } = req.params
        const guests = await Potluck.getPotluckGuests(id)
        res.status(200).json(guests)
    } catch(err) {
        next(err)
    }
})

router.put('/:id', restrict, checkPotluckExists, async (req, res, next) => {
    try {
        const { id } = req.params
        const newPotluck = await Potluck.updatePotluck(id, req.body)
        res.status(200).json(newPotluck)
    } catch(err) {
        next(err)
    }
})

router.post('/:id/guests', restrict, checkPotluckExists, async (req, res, next) => {
    try {
        const { id } = req.params
        const newGuest = {
            ...req.body,
            potluck_id: id
        }
        const guest = await Potluck.addGuest(newGuest)
        res.status(200).json(guest)
    } catch(err) {
        next(err)
    }
})

router.post('/:id/menu', restrict, checkPotluckExists, async (req, res, next) => {
    try {
        const { id } = req.params
        const newFood_Item = {
            ...req.body,
            potluck_id: id
        }
        const food_item = await Potluck.addFoodItem(newFood_Item)
        res.status(200).json(food_item)
    } catch(err) {
        next(err)
    }
})

router.delete('/:id', restrict, checkPotluckExists, async (req, res, next) => {
    try {
        const { id } = req.params
        await Potluck.deletePotluck(id)
        res.status(200).json({ message: 'Post has been deleted.'})
    } catch(err) {
        next(err)
    }
})

module.exports = router