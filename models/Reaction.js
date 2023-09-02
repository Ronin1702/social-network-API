// Import required modules and utility functions
const { Schema, Types } = require('mongoose');
const date = require('../utils/date');

// Define the Reaction schema
const reactionSchema = new Schema(
    {
        // Unique identifier for each reaction
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        // Text body of the reaction, must not exceed 280 characters
        reactionBody: {
            type: String,
            required: 'Reaction text is required!',
            maxlength: [280, 'Reaction must not exceed 280 characters!']
        },
        // Username of the user who created this reaction
        username: {
            type: String,
            required: 'Username is required!'
        },
        // Timestamp indicating when the reaction was created
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => date(timestamp)
        }
    },
    {
        toJSON: {
            //Use Getters method to format the date above
            getters: true
        },
        id: false
    }
);

// Export the Reaction schema
module.exports = reactionSchema;
