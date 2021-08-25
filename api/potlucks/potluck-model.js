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
                        .select('food_item_id', 'food_item', 'f.potluck_id', 'chosen')
                        .where('f.potluck_id', potluck_id)
                        .orderBy('food_item_id')
    return menu
}

const getPotluckGuests = async (potluck_id) => {
    const guests = await db('potlucks as p')
                        .join('guests as g', 'g.potluck_id', 'p.potluck_id')
                        .select('guest_id', 'guest_name', 'attending', 'g.potluck_id', 'bringing')
                        .where('g.potluck_id', potluck_id)
                        .orderBy('guest_id')
    return guests
}

const updatePotluck = async (potluck_id, potluck) => {
    const [newPotluck] = await db('potlucks').where('potluck_id', potluck_id).update(potluck, ['organizer_id', 'potluck_name', 'date', 'time', 'location'])
    return newPotluck
}

const addGuest = async (guest) => {
    const [newGuest] = await db('guests').insert(guest, ['guest_id', 'guest_name', 'attending', 'bringing', 'potluck_id'])
    return newGuest
}

const addFoodItem = async (food_item) => {
    const [newFood_Item] = await db('food_items').insert(food_item, ['food_item_id', 'food_item', 'chosen', 'potluck_id'])
    return newFood_Item
}

module.exports = {
    getAllPotlucks,
    getPotluckById,
    getPotluckMenu,
    getPotluckGuests,
    updatePotluck,
    addGuest,
    addFoodItem
}