const { Schema, model } = require('mongoose');

const UserSchema= new Schema(
    {
        username: {
            type: String,
            trim: true,
            required: 'Username is required',
            unique: true
        },

        email: {
            type: String,
            trim: true,
            required: 'Email is required',
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: this
            }
        ]
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User= model('User', UserSchema);

module.exports = User;