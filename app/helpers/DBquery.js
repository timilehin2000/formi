const Event = require("../models/EventModel");

const SavedEvent = require("../models/SavedEventModel");

const User = require("../models/UserModel");

class DBquery {
    static async findUserByEmail(email) {
        return await User.findOne({ email });
    }

    static async findEventById(id) {
        return await Event.findById(id);
    }

    static async findAllSavedEvents(param) {
        return await SavedEvent.find(param);
    }
}

module.exports = DBquery;
