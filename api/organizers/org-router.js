const express = require('express')

const router = express.Router()

const Org = require('./org-model')

const checkOrganizerExists = require("../middleware/checkOrganizerExists")

router.get('/:id/potlucks', checkOrganizerExists, async (req, res, next) => {
    try {
        const { id } = req.params
        const potlucks = await Org.getPotlucksByOrg(id)
        res.status(200).json(potlucks)
    } catch(err) {
        next()
    }
})

router.post('/:id', checkOrganizerExists, async (req, res, next) => {
    try {
        const { id } = req.params
        const potluck = {
            ...req.body,
            organizer_id: id
        }
        const newPotluck = await Org.createPotluck(potluck)
        res.status(200).json(newPotluck)
    } catch(err) {
        next(err)
    }
})

module.exports = router