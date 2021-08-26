module.exports = (req, res, next) => {
    const { potluck_name, date, time, location } = req.body

    if(!potluck_name || !date || !location || !time ) {
        next({ status: 422, message: 'potluck_name, date, time, location needed'})
    } else {
        next()
    }
}