const router = require("express").Router();

const {
    register,
    login,
    registerAdmin,
} = require("../controllers/AuthController");

const {
    validateRegisterPayload,
    validateLoginPayload,
} = require("../helpers/Validation");

router.post("/register", validateRegisterPayload, register);

router.post("/register/admin", validateRegisterPayload, registerAdmin);

router.post("/login", validateLoginPayload, login);

module.exports = router;
