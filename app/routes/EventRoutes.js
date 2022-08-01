const router = require("express").Router();

const { addNewEvent } = require("../controllers/EventController");

const { validateNewEventPayload } = require("../helpers/Validation");

router.post("/events/add", validateNewEventPayload, addNewEvent);

module.exports = router;
