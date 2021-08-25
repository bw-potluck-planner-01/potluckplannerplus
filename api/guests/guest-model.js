const db = require('../data/db-config')

const updateGuest = async (guest_id, guest) => {
    const [newGuest] = await db('guests').where('guest_id', guest_id).update(guest)
    return newGuest
}

const updateMenu = async (food_item_id, food_item) => {
    const [newFood_Item] = await db('food_items').where('food_item_id', food_item_id).update(food_item)
    return newFood_Item
}

module.exports = {
    updateGuest,
    updateMenu
}