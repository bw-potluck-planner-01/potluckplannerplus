const db = require('../data/db-config')

const getAllPotlucks = async () => {
    const potlucks = await db('potlucks')
    return potlucks
}

const getPotluckById = async (potluck_id) => {
    const potluck = await db('potlucks').where('potluck_id', potluck_id).first()
    return potluck
}

module.exports = {
    getAllPotlucks,
    getPotluckById
}