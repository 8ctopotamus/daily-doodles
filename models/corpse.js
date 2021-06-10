const mongoose = require('mongoose')
const Schema = mongoose.Schema

const corpseSchema = new Schema({
  roomId: {
    type: String,
    required: true,
  },
  right: {
    type: Schema.Types.ObjectId,
    ref: 'Drawing'
  },
  left: {
    type: Schema.Types.ObjectId,
    ref: 'Drawing'
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const Corpse = mongoose.model('Corpse', corpseSchema)

module.exports = Corpse