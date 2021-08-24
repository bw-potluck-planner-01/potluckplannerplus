const db = require('../data/db-config')

const getPotlucksByOrg = async (organizer_id) => {
    const potlucks = await db('potlucks as p')
                            .join('organizers as o', 'o.organizer_id', 'p.organizer_id')
                            .where('p.organizer_id', organizer_id)
                            .orderBy('potluck_id')
    return potlucks
}

module.exports = {
    getPotlucksByOrg
}