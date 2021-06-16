const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
  thoughtTitle: {
    type: String
  },
  createdBy: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Cent = model('2Cent', thoughtSchema);

module.exports = Cent;