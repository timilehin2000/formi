const {
    sendErrorResponse,
    sendSuccessResponse,
} = require("../helpers/Responses");
const Event = require("../models/EventModel");

class EventController {
    static async addNewEvent(req, res) {
        const { name, description, artist, location, date, type } = req.body;

        const newEvent = new Event({
            name,
            description,
            artist,
            location,
            date,
            type,
        });

        try {
            await newEvent.save();

            return sendSuccessResponse(
                res,
                "Successfully created a new event",
                newEvent,
                201
            );
        } catch (err) {
            return sendErrorResponse(
                res,
                "Sorry, an unknown errror occured",
                {},
                500
            );
        }
    }
}

module.exports = EventController;
