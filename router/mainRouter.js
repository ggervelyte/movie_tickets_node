const express = require('express')
const router = express.Router()

const {
    register,
    getMovies,
    login,
    getSeats
} = require('../controllers/mainController')

const { validateRegistration } = require('../modules/validator')

router.post('/register', validateRegistration, register)
router.post('/login', login)
router.get('/get_movie', getMovies)
// router.get('/get_seats', getSeats)

module.exports = router