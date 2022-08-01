const jwt = require("jsonwebtoken");

class Utils {
    static generateJwtToken(email) {
        const jwtKey = process.env.JWT_SECRET;

        const token = jwt.sign({ email }, jwtKey, {
            algorithm: "HS256",

            expiresIn: "3d",
        });

        return token;
    }
}

module.exports = Utils;
