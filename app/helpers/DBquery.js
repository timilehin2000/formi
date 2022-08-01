const Event = require("../models/EventModel");
const User = require("../models/UserModel");

class DBquery {
    static async findUserByEmail(email) {
        return await User.findOne({ email });
    }

    static async findEventById(id) {
        return await Event.findById(id);
    }
}

module.exports = DBquery;
