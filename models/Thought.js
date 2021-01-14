const { Schema, model, Types }= require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema( 
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: "Please enter a reaction.",
            maxlength: 280
        },
        username: {
            type: String,
            required: "Please enter a username."
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);


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
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: "Please enter a username."
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;