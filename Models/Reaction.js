const { Schema, model, Types } = require('mongoose');
const {dateFormat} = require("../util/format")

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Types.ObjectId,
      default: ()=>new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (value)=>{return dateFormat(value)}
    },
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

module.exports = ReactionSchema