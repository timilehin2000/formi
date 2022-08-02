const router = require("express").Router();

const {
    addNewEvent,
    fetchAllEvents,
} = require("../controllers/EventController");

const { validateNewEventPayload } = require("../helpers/Validation");

router.post("/events/add", validateNewEventPayload, addNewEvent);

router.get("/events", fetchAllEvents);

module.exports = router;
