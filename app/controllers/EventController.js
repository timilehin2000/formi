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

    static async fetchAllEvents(req, res) {
        const { name, description, date, artist, location, type } = req.query;

        const filter = {};

        if (name) {
            filter.name = name;
        } else if (description) {
            filter.description = description;
        } else if (date) {
            filter.date = date;
        } else if (artist) {
            filter.artist = artist;
        } else if (location) {
            filter.location = location;
        } else if (type) {
            filter.type = type;
        }

        try {
            const fetchEvents = await Event.find(filter);

            if (!fetchEvents.length) {
                return sendErrorResponse(res, "No events found", {}, 404);
            }

            return sendSuccessResponse(
                res,
                "Successfully fetched all events",
                fetchEvents,
                200
            );
        } catch (err) {
            sendErrorResponse(res, "Sorry, an unknown error occured", {}, 500);
        }
    }
}

module.exports = EventController;
