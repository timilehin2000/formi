const router = require("express").Router();

const {
    addNewEvent,
    fetchAllEvents,
} = require("../controllers/EventController");

const { validateNewEventPayload } = require("../helpers/Validation");
const {
    onlyAdmin,
    authTokenRequired,
} = require("../middleware/AuthPermission");

router.post(
    "/events/add",
    authTokenRequired,
    onlyAdmin,
    validateNewEventPayload,
    addNewEvent
);

router.get("/events", fetchAllEvents);

module.exports = router;
