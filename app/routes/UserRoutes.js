const router = require("express").Router();

const {
    saveEvent,
    fetchAllUserSavedEvents,
    deleteAllSavedEvents,
} = require("../controllers/UserController");

const { validateAddSavedEventPayload } = require("../helpers/Validation");

const { authTokenRequired } = require("../middleware/AuthPermission");

router.post(
    "/events/",
    authTokenRequired,
    validateAddSavedEventPayload,
    saveEvent
);

router.delete("/events/", authTokenRequired, deleteAllSavedEvents);

router.get("/events", authTokenRequired, fetchAllUserSavedEvents);

module.exports = router;
