const Org = require('../organizers/org-model')

module.exports = async (req, res, next) => {
    try {
        const { id } = req.params
        const organizer = await Org.findOrgById(id)
        if(organizer) {
            next()
        } else {
            next({ status: 404, message: 'User not found.'})
        }
    } catch(err) {
        next(err)
    }
}