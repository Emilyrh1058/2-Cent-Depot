const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment _id{
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    reactionBody: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 500
    },
    username: {
      type: String,
      required: true
    }
  },
);

const User = model('Reaction', reactionSchema);

module.exports = Reaction;
