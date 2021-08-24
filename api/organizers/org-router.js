const express = require('express')

const router = express.Router()

const Org = require('./org-model')

router.get('/:id/potlucks', async (req, res, next) => {
    try {
        const { id } = req.params
        const potlucks = await Org.getPotlucksByOrg(id)
        res.status(200).json(potlucks)
    } catch(err) {
        next()
    }
})

module.exports = router