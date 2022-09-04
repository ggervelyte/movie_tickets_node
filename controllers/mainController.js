const sendRes = require('../modules/sendRes')
const fetch = require('node-fetch')
const userDb = require('../schemas/userSchema')
const bcrypt = require('bcrypt')

module.exports = {
    register: async (req, res) => {
        const { username, passOne, age } = req.body
        const password = await bcrypt.hash(passOne, 10)

        const user = new userDb({
            username,
            password
        })

        await user.save()
        res.send({ login: true })
    },
    login: async (req, res) => {
        const { username, password } = req.body

        const user = await userDb.findOne({ username })

        if (!user) return sendRes(res, "Bad credentials", true)

        const compare = await bcrypt.compare(password, user.password)

        if (!compare) return sendRes(res, 'Bad bad bad', true)

        return sendRes(res, 'All good', false, { user })
    },
    getMovies: async (req, res) => {
        const url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=11'

        const response = await fetch(url)
            .then(res => res.json())
            .catch(e => {
                console.log('error');
            })
        res.send(response)
    },
    // getSeats: (req, res) => {
    //     const seats = []
    //     for (let i = 0; i < 15; i++) {
    //         seats.push({
    //             reservedBy: ''
    //         })

    //     }
    //     res.send({ seats })
    // }
}