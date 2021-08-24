const Auth = require('../auth/auth-model')
const bcrypt = require('bcrypt')

module.exports = async (req, res, next) => {
    const { username, password } = req.body
    const organizer = await Auth.findByUsername(username)
    if(organizer && bcrypt.compareSync(password, organizer.password)) {
        next()
    } else {
        next({ status:400, message: 'invalid credentials'})
    }
}