/**
 * @file User.js
 * Defines the schema for the User document and initializes the User model
 */
const { Schema, model } = require('mongoose');

/* Define the schema to create User model */
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'Username is required!',
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: 'Email address is required!',
            // Validates the email address using regex pattern
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
        }, 
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: "Thought"
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

/* Create a virtual property 'friendCount' that retrieves the length of the user's friends array field on query */
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

/* Initialize the User model */
const User = model('user', userSchema);
module.exports = User;
