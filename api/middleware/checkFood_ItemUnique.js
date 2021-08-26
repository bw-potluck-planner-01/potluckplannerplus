const Potluck = require('../potlucks/potluck-model')

module.exports = async (req, res, next) => {
    try {
        const { id } = req.params
        const { food_item } = req.body
        const menu = await Potluck.getPotluckMenu(id)
        if(menu.length > 0) {
            menu.map((item) => {
                if(item.food_item === food_item) {
                    next({ status: 422, message: `${food_item} is already on the menu!`})
                }
            })
        } else {
            next()
        }
    } catch(err) {
        next(err)
    }
}