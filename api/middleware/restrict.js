const jwt = require('jsonwebtoken')
const { TOKEN_SECRET } = require('../config/secret')

module.exports = (req, res, next) => {
    const token = req.headers.authorization

    if(!token) {
        next({ status: 422, message: 'No token given, we need that token!'})
    } else {
        jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
            if(err) {
                next({ status: 401, message: 'Token invalid!'})
            } else {
                req.decodedJwt = decoded
                next()
            }
        })
    }
}