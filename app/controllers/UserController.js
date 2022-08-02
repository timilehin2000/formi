const SavedEvent = require("../models/SavedEventModel");

const {
    findEventById,
    findAllSavedEvents,
    findAllSavedEventsAndDelete,
    findSingleSavedEvent,
    findSavedEventAndDelete,
} = require("../helpers/DBquery");

const {
    sendErrorResponse,
    sendSuccessResponse,
} = require("../helpers/Responses");

class UserContoller {
    static async saveEvent(req, res) {
        const { email, _id } = req.user;

        const { eventId } = req.body;

        const findEvent = await findEventById(eventId);

        if (!findEvent) {
            return sendErrorResponse(res, "No event with found", {}, 404);
        }

        const newSavedEvent = new SavedEvent({
            userId: _id,
            eventId,
        });

        try {
            await newSavedEvent.save();

            return sendSuccessResponse(
                res,
                "Successfully saved event",
                newSavedEvent,
                201
            );
        } catch (err) {
            return sendErrorResponse(
                res,
                "Sorry, an unknwon error occured",
                {},
                500
            );
        }
    }

    static async fetchAllUserSavedEvents(req, res) {
        const { _id } = req.user;

        const filter = { userId: _id };

        try {
            const fetchEvents = await findAllSavedEvents({ userId: _id });
            if (!fetchEvents.length) {
                return sendSuccessResponse(
                    res,
                    "You have no saved events yet",
                    {},
                    200
                );
            }

            return sendSuccessResponse(
                res,
                "Successfully fetched all saved events",
                { totalSavedEvents: fetchEvents.length, events: fetchEvents },
                200
            );
        } catch (err) {
            console.log(err);
            return sendErrorResponse(res, "Sorry, an error occured", {}, 500);
        }
    }

    static async fetchSingleSavedEvent(req, res) {
        const { _id } = req.user;

        const { eventId } = req.params;

        const filter = { userId: _id, _id: eventId };

        try {
            const fetchEvent = await findSingleSavedEvent(filter);
            if (!fetchEvent) {
                return sendErrorResponse(res, "No event found", {}, 404);
            }

            return sendSuccessResponse(
                res,
                "Successfully fetched saved event",
                fetchEvent,
                200
            );
        } catch (err) {
            return sendErrorResponse(
                res,
                "Sorry, an unknown error occured",
                {},
                500
            );
        }
    }

    static async deleteAllSavedEvents(req, res) {
        const { _id } = req.user;

        const filter = { userId: _id };

        try {
            const deleteEvents = await findAllSavedEventsAndDelete(filter);
            if (!deleteEvents.deletedCount) {
                return sendSuccessResponse(
                    res,
                    "You have no saved events yet",
                    {},
                    200
                );
            }

            return sendSuccessResponse(
                res,
                "Successfully deleted all saved events",
                {},
                200
            );
        } catch (err) {
            return sendErrorResponse(
                res,
                "Sorry, an unknown error occured",
                {},
                500
            );
        }
    }

    static async deleteSingleSavedEvent(req, res) {
        const { _id } = req.user;

        const { eventId } = req.params;

        const filter = { userId: _id, _id: eventId };

        try {
            const deleteEvent = await findSavedEventAndDelete(filter);
            if (!deleteEvent) {
                return sendErrorResponse(res, "No event found", {}, 404);
            }

            return sendSuccessResponse(
                res,
                "Successfully deleted saved event",
                {},
                200
            );
        } catch (err) {
            console.log(err);
            return sendErrorResponse(
                res,
                "Sorry, an unknown error occured",
                {},
                500
            );
        }
    }
}

module.exports = UserContoller;
