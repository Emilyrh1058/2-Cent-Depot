const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema(
  {

    thoughtInput: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 500,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);

UserSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const User = model('Thought', thoughtSchema);

module.exports = Thought;
