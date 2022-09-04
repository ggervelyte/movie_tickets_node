const sendRes = require('./sendRes')

module.exports = {
    validateRegistration: (req, res, next) => {
        const { passOne, passTwo } = req.body

        if (passOne !== passTwo) {
            return sendRes(res, "bad credentials", true)
        }

        next()
    }
}