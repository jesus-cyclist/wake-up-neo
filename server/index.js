// const express = require('express')
// const socketIo = require('socket.io')
// const bodyParser = require('body-parser')
// const cors = require('cors')
// const cookieParser = require('cookie-parser')
// require('dotenv').config()
// const mongoose = require('mongoose')
// const router = require('./router/index')
// const errorMiddleware = require('./middlewares/error-middleware')
// const http = require('http')
// const { handleWebSocketConnection } = require('./controllers/socket-controller')

// const PORT = process.env.PORT || 5000
// const app = express()
// const server = http.createServer(app)
// const io = socketIo(server, {
//   path: '/api/messages',
// })

// app.use(express.json())
// app.use(cookieParser())
// app.use(
//   cors({
//     credentials: true,
//     origin: process.env.CLIENT_URL,
//   })
// )
// app.use(bodyParser.json())
// app.use('/api', router)
// app.use(errorMiddleware)

// io.on('connection', (socket) => handleWebSocketConnection(socket, io))

// const start = async () => {
//   try {
//     await mongoose.connect(process.env.DB_URL, {})
//     server.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
//   } catch (error) {
//     console.log(error)
//   }
// }

// start()

const express = require('express')
const socketIo = require('socket.io')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const mongoose = require('mongoose')
const router = require('./router/index')
const fs = require('fs')
const errorMiddleware = require('./middlewares/error-middleware')

const https = require('https')
const { handleWebSocketConnection } = require('./controllers/socket-controller')

const PORT = process.env.PORT || 5000
const app = express()

const privateKey = fs.readFileSync('./certificates/privkey.pem', 'utf8')
const certificate = fs.readFileSync('./certificates/fullchain.pem', 'utf8')
const credentials = { key: privateKey, cert: certificate }

const server = https.createServer(credentials, app)
const io = socketIo(server, {
  path: '/api/messages',
})

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
)
app.use(bodyParser.json())
app.use('/api', router)
app.use(errorMiddleware)

io.on('connection', (socket) => handleWebSocketConnection(socket, io))

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {})
    server.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

start()
