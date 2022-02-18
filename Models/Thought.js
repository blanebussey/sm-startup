const { Schema, model, Types } = require('mongoose');
const Reaction = require("./Reaction")
const {dateFormat} = require("../util/format")

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (value)=>{return dateFormat(value)}
    },
    username: {
      type: String,
      required: true
    },
    reactions: [Reaction]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

ThoughtSchema.virtual("reactionCount").get(function(){
  return this.reactions.length
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
