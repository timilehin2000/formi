const jwt = require("jsonwebtoken");

const { findUserByEmail } = require("../helpers/DBquery");

const { sendErrorResponse } = require("../helpers/Responses");

class Auth {
    static async authTokenRequired(req, res, next) {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];

            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);

                if (!decoded) {
                    return sendErrorResponse(
                        res,
                        "Invalid authentication token was provided",
                        {},
                        401
                    );
                }

                const user = await findUserByEmail(decoded.email);

                if (!user) {
                    return sendErrorResponse(
                        res,
                        "No account associated with this data found. Please sign in",
                        {},
                        401
                    );
                }

                req.user = user;

                next();
            } catch (err) {
                return sendErrorResponse(
                    res,
                    "Invalid authentication token provided",
                    {},
                    401
                );
            }
        } else {
            return sendErrorResponse(
                res,
                "Access Denied. No authenticaation token was provided",
                {},
                403
            );
        }
    }
}

module.exports = Auth;
