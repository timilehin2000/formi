const router = require("express").Router();

const {
    saveEvent,
    fetchAllUserSavedEvents,
} = require("../controllers/UserController");

const { validateAddSavedEventPayload } = require("../helpers/Validation");

const { authTokenRequired } = require("../middleware/AuthPermission");

router.post(
    "/events/",
    authTokenRequired,
    validateAddSavedEventPayload,
    saveEvent
);

router.get("/events", authTokenRequired, fetchAllUserSavedEvents);

module.exports = router;
