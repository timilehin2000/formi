const router = require("express").Router();

const {
    saveEvent,
    fetchAllUserSavedEvents,
    deleteAllSavedEvents,
    deleteSingleSavedEvent,
    fetchSingleSavedEvent,
} = require("../controllers/UserController");

const { validateAddSavedEventPayload } = require("../helpers/Validation");

const { authTokenRequired, onlyUser } = require("../middleware/AuthPermission");

router.post(
    "/user/events/",
    authTokenRequired,
    validateAddSavedEventPayload,
    saveEvent
);

router.delete(
    "/user/events",
    authTokenRequired,
    onlyUser,
    deleteAllSavedEvents
);

router.get(
    "/user/events",
    authTokenRequired,
    onlyUser,
    fetchAllUserSavedEvents
);

router.get(
    "/user/events/:eventId",
    authTokenRequired,
    onlyUser,
    fetchSingleSavedEvent
);

router.delete(
    "/user/events/:eventId",
    onlyUser,
    authTokenRequired,
    deleteSingleSavedEvent
);

module.exports = router;
