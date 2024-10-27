const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Rating: {
    type: Number,
  },
  Notes: {
    type: String,
  },
  Plays: {
    type: Number,
  }
})

module.exports = mongoose.model('Game', GameSchema)