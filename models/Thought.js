const { Schema, model }= require('mongoose');

const thoughtSchema = new Schema( 
    {
        thoughtText: {
            type: String,
            required: "Please enter your thoughts.",
            minlength: 1,
            maxlength: 280
        },
        // need to create date
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: "Please enter a username."
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true
        }
    },
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;