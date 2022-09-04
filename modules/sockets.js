const socket = require('socket.io')
const seatsGenerator = require('../modules/seatsGenerator')

const seats = seatsGenerator()
const users = []


const helpers = {
    getUser: (socketId) => {
        const result = users.find(x => x.id === socketId)
        return result.user

    },
    generateSeatsToUsers: (io) => {
        users.map(x => {
            io.to(x.id).emit('log', seats)
        })
    }
}

module.exports = (http) => {
    const io = socket(http, { cors: { origin: 'http://localhost:3000' } })

    io.on('connect', (socket) => {
        // console.log(`User connected: ${socket.id}`)
        socket.on('login', user => {
            const newUser = {
                user,
                id: socket.id
            }
            users.push(newUser)
            socket.emit('log', seats)
        })

        socket.on("reservation", data => {
            const user = helpers.getUser(socket.id)
            console.log(user);
            const { seatIndex: reserved } = data
            // console.log(user)
            seats[reserved].reservedBy = user.username
            helpers.generateSeatsToUsers(io)
        })

        socket.on('disconnect', () => {
            console.log('User disconnected', socket.id);
        })
    })
}