const router = require("express").Router();

const { saveEvent } = require("../controllers/UserController");

const { validateAddSavedEventPayload } = require("../helpers/Validation");

const { authTokenRequired } = require("../middleware/AuthPermission");

router.post(
    "/events/add",
    authTokenRequired,
    validateAddSavedEventPayload,
    saveEvent
);
// router.post("/login", validateLoginPayload, login);

module.exports = router;
