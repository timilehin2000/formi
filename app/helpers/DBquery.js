const User = require("../models/UserModel");

const Event = require("../models/EventModel");

const SavedEvent = require("../models/SavedEventModel");

class DBquery {
    static async findUserByEmail(email) {
        return await User.findOne({ email });
    }

    static async findEventById(id) {
        return await Event.findById(id);
    }

    static async findAllSavedEvents(param) {
        return await SavedEvent.find(param)
            .populate({
                path: "userId",
                select: "name email",
            })
            .populate({
                path: "eventId",
                select: "name description date artist location type",
            });
    }

    static async findAllSavedEventsAndDelete(param) {
        return await SavedEvent.deleteMany(param);
    }
}

module.exports = DBquery;
