const Potluck = require('../potlucks/potluck-model')

module.exports = async (req, res, next) => {
    try {
        const { potluck_name } = req.body
        const potlucks = await Potluck.getAllPotlucks()
        if(potlucks.length > 0) {
            potlucks.map((potluck) => {
                if(potluck.potluck_name === potluck_name) {
                    next({ status: 422, message: `${potluck_name} is already taken.`})
                } else {
                    next()
                }
            })
        } else {
            next()
        }
    } catch(err) {
        next(err)
    }
}