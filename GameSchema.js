const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    GameTitle: {
      type: String,
      required: true
    },
    ReleaseYear: {
      type: Number,
      required: true
    },
    Platform: {
      type: String,
      required: true
    },
    Genre: {
      type: String,
      required: true
    },
    DeveloperPublisher: {
      type: String,
      required: true
    },
    Description: {
      type: String,
      required: true
    },
    Rating: {
      type: Number,
      required: true
    }
  });
  
  module.exports = mongoose.model('games_lists', gameSchema);