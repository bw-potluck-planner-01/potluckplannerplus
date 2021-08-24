const db = require('../data/db-config')

const findOrgById = async (organizer_id) => {
    const organizer = await db('organizers').where('organizer_id', organizer_id).first()
    return organizer
}

const getPotlucksByOrg = async (organizer_id) => {
    const potlucks = await db('potlucks as p')
                            .join('organizers as o', 'o.organizer_id', 'p.organizer_id')
                            .select('p.organizer_id', 'potluck_name', 'date', 'time', 'location')
                            .where('p.organizer_id', organizer_id)
                            .orderBy('potluck_id')
    return potlucks
}

const createPotluck = async (potluck) => {
    const [newPotluck] = await db('potlucks').insert(potluck, ['organizer_id', 'potluck_name', 'date', 'time', 'location'])
    return newPotluck
}

module.exports = {
    getPotlucksByOrg,
    createPotluck,
    findOrgById
}