const router = require("express").Router();

const { register, login } = require("../controllers/AuthController");

const {
    validateRegisterPayload,
    validateLoginPayload,
} = require("../helpers/Validation");

router.post("/register", validateRegisterPayload, register);
router.post("/login", validateLoginPayload, login);

module.exports = router;
