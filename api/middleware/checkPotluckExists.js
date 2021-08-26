const Potluck = require('../potlucks/potluck-model')

module.exports = async (req, res, next) => {
    try {
        const { id } = req.params
        const potluck = await Potluck.getPotluckById(id)
        if(potluck) {
            next()
        } else {
            next({ status: 404, message: 'Potluck not found.'})
        }
    } catch(err) {
        next(err)
    }
}