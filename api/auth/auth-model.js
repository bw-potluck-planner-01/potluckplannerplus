const db = require('../data/db-config')

const registerOrganizer = async (organizer) => {
    const [newOrganizer] = await db('organizers').insert(organizer)
    return newOrganizer
}

const findByUsername = async (username) => {
    const organizer = await db('organizers').where('username', username).first()
    return organizer
}

module.exports = {
    registerOrganizer,
    findByUsername
}