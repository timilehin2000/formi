const router = require("express").Router();

const {
    saveEvent,
    fetchAllUserSavedEvents,
    deleteAllSavedEvents,
    deleteSingleSavedEvent,
    fetchSingleSavedEvent,
} = require("../controllers/UserController");

const { validateAddSavedEventPayload } = require("../helpers/Validation");

const { authTokenRequired } = require("../middleware/AuthPermission");

router.post(
    "/events/",
    authTokenRequired,
    validateAddSavedEventPayload,
    saveEvent
);

router.delete("/saved-events/", authTokenRequired, deleteAllSavedEvents);

router.get("/saved-events", authTokenRequired, fetchAllUserSavedEvents);

router.get("/saved-events/:eventId", authTokenRequired, fetchSingleSavedEvent);

router.delete(
    "/saved-events/:eventId",
    authTokenRequired,
    deleteSingleSavedEvent
);

module.exports = router;
