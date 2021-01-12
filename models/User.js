const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'Please enter a username.',
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: 'Please enter an email address.',
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },
        thoughts:[thoughtSchema],
        friends:[userSchema],
    },
        {
            toJSON: {
                virtuals: true,
                getters: true
            },
            id: false
        },
);

userSchema.virtual('friendCount'.get(function() {
    return this.friends.length
}))
const User = model('User', userSchema);

module.exports = User;