const { Schema, model } = require('mongoose');
const { Thought } = require('.');

const ThoughtSchema= new Schema(
    {
        thoughtText: {
            type: String,
            required: 'Username is required',
            validate: [({ charLen }) => (charLen >= 1) && (charLen <= 280), 'Password should be longer.']
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },

        username: {
            type: String,
            required: 'Username is required',
        },

        reactions: [reactionSchema]
    }
);

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

module.exports= Thought;