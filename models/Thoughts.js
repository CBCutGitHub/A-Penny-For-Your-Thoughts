const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reactions');

// Schema to create Student model
const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 50,
    },
    userName: {
      type: String,
      required: true,
      max_length: 50,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reaction: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

thoughtsSchema.virtual("reactionCount").get(function(){
  return this.reaction.length
})

const Thoughts = model('Thoughts', thoughtsSchema);

module.exports = Thoughts;
