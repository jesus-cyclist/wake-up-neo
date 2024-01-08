const mongoose = require('mongoose')
const MessageService = require('../service/message-service')
const MessageModel = require('../models/message-model')

let connectionsCount = 0
let connectedUsers = []
let userSockets = {}
let typingUsers = []

const handleWebSocketConnection = (socket, io) => {
  const messageChangeStream = mongoose.connection.db
    .collection('messages')
    .watch()

  ++connectionsCount
  const userData = JSON.parse(socket.handshake.query.user)

  if (userSockets[userData.id]) {
    const previousSocket = userSockets[userData.id]
    io.to(previousSocket.id).emit(
      'loggingFromAnotherDevice',
      'Был произведен вход с другого устройства'
    )
    previousSocket.disconnect(true)
    connectedUsers = connectedUsers.filter((user) => user.id !== userData.id)
  }

  userSockets[userData.id] = socket
  connectedUsers.push(userData)

  socket.emit(
    'login',
    JSON.stringify({
      connectionsCount,
      connectedUsers,
    })
  )

  console.log(connectedUsers)

  socket.broadcast.emit(
    'user joined',
    JSON.stringify({
      user: userData,
      connectionsCount,
      connectedUsers,
    })
  )

  socket.on('disconnect', () => {
    if (connectionsCount) {
      --connectionsCount
      connectedUsers = connectedUsers.filter((user) => user.id !== userData.id)
      console.log('disconnect', connectedUsers)
      socket.broadcast.emit(
        'user left',
        JSON.stringify({
          user: userData,
          connectionsCount,
          connectedUsers,
        })
      )
    }
  })

  socket.on('message:getHistoryMessage', async () => {
    const messages = await MessageService.getAllMEssages()
    socket.emit('message:recieveHistoryMessage', JSON.stringify(messages))
  })

  socket.on('message:createNewMessage', async (data) => {
    const parsedData = JSON.parse(data)
    const message = await MessageService.addMessage(parsedData)
    socket.broadcast.emit('message:getNewMessage', JSON.stringify(message))
    io.to(socket.id).emit('message:updateMessage', JSON.stringify(message))
  })

  socket.on('message:editMessage', async (data) => {
    const parsedData = JSON.parse(data)
    const message = await MessageService.editMessage(parsedData)
    io.emit('message:updateMessage', JSON.stringify(message))
  })

  socket.on('message:deleteMessage', async (data) => {
    const parsedData = JSON.parse(data)

    const message = await MessageService.deleteMessage(parsedData)

    io.emit('message:getDeletedMessageId', JSON.stringify(message))
  })

  socket.on('message:startTyping', async (data) => {
    const parsedData = JSON.parse(data)
    typingUsers.push(parsedData)
    io.emit('message:usersTyping', JSON.stringify(typingUsers))
  })

  socket.on('message:stopTyping', async (data) => {
    const parsedData = JSON.parse(data)
    typingUsers = typingUsers.filter((user) => user.id !== parsedData.id)
    io.emit('message:usersTyping', JSON.stringify(typingUsers))
  })
}

module.exports = { handleWebSocketConnection }
