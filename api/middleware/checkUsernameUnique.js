const db = require('../data/db-config')

module.exports = async (req, res, next) => {
    const { username } = req.body
    const organizers = await db('organizers')
    if(organizers.length > 0) {
        organizers.map((organizer) => {
            if(organizer.username === username) {
                next({ status: 422, message: 'username taken'})
            } else {
                next()
            }
        })
    } else {
        next()
    }
}