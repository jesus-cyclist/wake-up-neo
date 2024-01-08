const { Schema, model } = require('mongoose')

const MessageSchema = new Schema({
  _id: { type: String, required: true },
  user: {
    id: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
  },
  text: { type: String, required: true },
  timestamp: { type: String, required: true },
  read: { type: Boolean, required: true },
  delivered: { type: Boolean, required: true },
  type: { type: String, required: true },
  replyTo: {
    type: Object,
    required: function () {
      return this.replyTo === null ? false : true
    },
  },
  edited: { type: Boolean, required: true },
  typed: { type: Boolean, required: true },
})

module.exports = model('Message', MessageSchema)
