const { Schema, model, Types } = require('mongoose');
const { Reaction } = require('.');

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

module.exports= Reaction;