const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const moment= require('moment');

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
    },
    {
        toJSON: {
            getters: true
        },
        id: false
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
    },
    {
        toJSON: {
          virtuals: true,
          getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

function dateformat(){
    return moment().format('MMMM Do YYYY, h:mm a');
}

const Thought= model('Thought', ThoughtSchema);

module.exports= Thought;