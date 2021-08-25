const db = require('../data/db-config')

const updateMenu = async (food_item_id, food_item) => {
    const [newFood_Item] = await db('food_items').where('food_item_id', food_item_id).update(food_item)
    return newFood_Item
}

const deleteFromMenu = async (food_item_id) => {
    await db('food_items').where('food_item_id', food_item_id).del()
    return
}

module.exports = {
    updateMenu,
    deleteFromMenu
}