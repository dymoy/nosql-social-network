const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction.js');
const format_date = require("../utils/format_date.js");

/* Define the schema to create Thought model */
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'Thought text is required!',
            min: 1,
            max: 280
        }, 
        createdAt: {
            type: Date,
            default: Date.now,
            // Use a getter method to format the timestamp on query
            get: (date) => format_date(date)
        },
        // The user that created this thought
        username: {
            type: String,
            required: true
        },
        // Array of nested documents created with the reactionSchema
        reactions: [Reaction]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

/* Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query */
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

/* Initialize the Thought model */
const Thought = model('thought', thoughtSchema);
module.exports = Thought;
