const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const SavedEventSchema = new Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },

        eventId: {
            type: mongoose.Types.ObjectId,
            ref: "Event",
        },
    },

    { timestamps: true }
);

const SavedEvent = mongoose.model("SavedEvent", SavedEventSchema);

module.exports = SavedEvent;
