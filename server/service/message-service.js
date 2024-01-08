const UserModel = require('../models/user-model')
const tokenService = require('./token-service')
const TokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-error')
const bcrypt = require('bcrypt')
const TokenModel = require('../models/token-model')
const MessageModel = require('../models/message-model')

//файл message-service.js
class MessageService {
  async getAllMEssages() {
    const allMessages = await MessageModel.find()
    return allMessages
  }

  async addMessage(message) {
    await MessageModel.create({
      ...message,
      delivered: true,
      typed: true,
    })
    return {
      ...message,
      delivered: true,
    }
  }

  async editMessage(message) {
    const id = message._id
    const updatedMessage = await MessageModel.findByIdAndUpdate(id, message, {
      new: true,
    })
    return updatedMessage
  }

  async deleteMessage(message) {
    const isDeletedMessageSuccess = await MessageModel.deleteOne({
      _id: message._id,
    })
      .then((res) => {
        if (res.acknowledged && !!res.deletedCount) {
          return { success: true, _id: message._id }
        } else {
          return { success: false, _id: message._id }
        }
      })
      .catch((e) => console.log(error))
    console.log(isDeletedMessageSuccess)
    return isDeletedMessageSuccess
  }
}

module.exports = new MessageService()
