const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
const mainRouter = require('./router/mainRouter')
const http = require('http').createServer(app)

require('./modules/sockets')(http)
require('dotenv').config()

mongoose.connect(process.env.MONGO_KEY).then(res => {
    console.log('CONNECTION SUCCESSFUL');
}).catch(e => {
    console.log('ERROR');
})

http.listen(4000)
app.use(express.json())

app.use(cors({
    origin: true,
    credentials: true,
    methods: 'GET, POST'
}))




app.use('/', mainRouter)