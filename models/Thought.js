const { Schema, model, Types } = require('mongoose');

const ReactionSchema= new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        
        reactionBody:{
            type: String,
            required: true,
            maxLength: 280
        },

        username: {
            type: String,
            required: 'Username is required',
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    }
);

const ThoughtSchema= new Schema(
    {
        thoughtText: {
            type: String,
            required: 'Text is required',
            minLength: 1,
            maxLength: 280
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

        reactions: [ReactionSchema]
    }
);

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought= model('Thought', ThoughtSchema);

module.exports= Thought;