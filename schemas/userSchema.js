const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemModel = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    money: {
        type: Number,
        default: 100,
        required: false
    }
})

module.exports = mongoose.model('cinemaUsers', itemModel)