const db = require('../data/db-config')

const updateGuest = async (guest_id, guest) => {
    const [newGuest] = await db('guests').where('guest_id', guest_id).update(guest)
    return newGuest
}

const deleteGuest = async (guest_id) => {
    await db('guests').where('guest_id', guest_id).del()
    return
}


module.exports = {
    updateGuest,
    deleteGuest
}