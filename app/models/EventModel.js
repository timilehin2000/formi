const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema(
    {
        name: {
            type: String,
        },

        description: {
            type: String,
        },

        date: {
            type: Date,
            default: Date.now(),
        },

        artist: {
            type: String,
        },

        location: {
            type: String,
        },

        type: {
            type: String,
            enum: ["EDM", "Techno", "Hip-Hop"],
        },
    },

    { timestamps: true }
);

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;

// name, description, date, artist, location, and type
