const express = require('express')

const router = express.Router()

const Potluck = require('./potluck-model')

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


module.exports = router