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
    "/user/events/",
    authTokenRequired,
    validateAddSavedEventPayload,
    saveEvent
);

router.delete("/user/events", authTokenRequired, deleteAllSavedEvents);

router.get("/user/events", authTokenRequired, fetchAllUserSavedEvents);

router.get("/user/events/:eventId", authTokenRequired, fetchSingleSavedEvent);

router.delete(
    "/user/events/:eventId",
    authTokenRequired,
    deleteSingleSavedEvent
);

module.exports = router;
