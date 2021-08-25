const express = require('express')

const router = express.Router()

const Menu = require('./menu-model')

const restrict = require('../middleware/restrict')

router.put('/:id', restrict, async (req, res, next) => {
    try {
        const { id } = req.params
        const newMenu = await Menu.updateMenu(id, req.body)
        res.status(200).json(newMenu)
    } catch(err) {
        next(err)
    }
})

router.delete('/:id', restrict, async (req, res, next) => {
    try {
        const { id } = req.params
        await Menu.deleteFromMenu(id)
        res.status(200).json({ message: 'Menu has been deleted.'})
    } catch(err) {
        next(err)
    }
})

module.exports = router