const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const date = require('../utils/date');


const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: [true, 'No thoughts? Write down your thoughts!'],
      minlength: [1, 'thoughtText must be at least 1 character long'],
      maxlength: [280, 'thoughtsText cannot be longer than 280 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => date(timestamp)
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      get: timestamp => date(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    },
    id: false,
    timestamps: true,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
