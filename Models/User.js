const { Schema, model, Types } = require('mongoose');


const UserSchema = new Schema(
  {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: [{
        type: Types.ObjectId,
        ref: "thoughts"
    }],
    friends: [{
       type: Types.ObjectId,
       ref: "users" 
    }]
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

UserSchema.virtual("friendCount").get(function(){
    return this.friends.length
})

const User = model('User', UserSchema);

module.exports = User;
