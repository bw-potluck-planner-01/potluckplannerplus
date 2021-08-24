const db = require('../data/db-config')

const getAllPotlucks = async () => {
    const potlucks = await db('potlucks')
    return potlucks
}

const getPotluckById = async (potluck_id) => {
    const potluck = await db('potlucks').where('potluck_id', potluck_id).first()
    return potluck
}

const getPotluckMenu = async (potluck_id) => {
    const menu = await db('potlucks as p')
                        .join('food_items as f', 'f.potluck_id', 'p.potluck_id')
                        .select('food_item_id', 'food_item')
                        .where('f.potluck_id', potluck_id)
                        .orderBy('food_item_id')
    return menu
}

module.exports = {
    getAllPotlucks,
    getPotluckById,
    getPotluckMenu
}