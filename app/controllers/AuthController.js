const { findUserByEmail } = require("../helpers/DBquery");

const {
    sendSuccessResponse,
    sendErrorResponse,
} = require("../helpers/Responses");
const { generateJwtToken } = require("../helpers/Utils");
const User = require("../models/UserModel");

class AuthController {
    static async register(req, res) {
        const { name, email, password } = req.body;

        const findUser = await findUserByEmail(email);
        if (findUser) {
            return sendErrorResponse(
                res,
                "An account with this email already exists",
                {},
                400
            );
        }

        const newUser = new User({
            name,
            email,
            password,
        });

        try {
            await newUser.save();
            return sendSuccessResponse(
                res,
                "A new User successfully created",
                newUser,
                201
            );
        } catch (err) {
            return sendErrorResponse(
                res,
                "Sorry, an unknown error occured",
                {},
                500
            );
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;

        const findUser = await findUserByEmail(email);
        if (!findUser) {
            return sendErrorResponse(res, "Invalid login details", {}, 404);
        }

        const validatePassword = await findUser.comparePassword(password);
        if (!validatePassword) {
            return sendErrorResponse(res, "Invalid login details.", {}, 404);
        }

        const isAdmin = findUser.isAdmin;
        const token = generateJwtToken(email);

        return sendSuccessResponse(
            res,
            "Successfully logged in",
            { email, isAdmin, token },
            200
        );
    }

    static async registerAdmin(req, res) {
        const { name, email, password } = req.body;

        const findUser = await findUserByEmail(email);
        if (findUser) {
            return sendErrorResponse(
                res,
                "An account with this email already exists",
                {},
                400
            );
        }

        const newUser = new User({
            name,
            email,
            password,
            isAdmin: true,
        });

        try {
            await newUser.save();
            return sendSuccessResponse(
                res,
                "A new Admin successfully created",
                newUser,
                201
            );
        } catch (err) {
            return sendErrorResponse(
                res,
                "Sorry, an unknown error occured",
                {},
                500
            );
        }
    }
}

module.exports = AuthController;
