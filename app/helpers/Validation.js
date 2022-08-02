const joi = require("joi");

const { handleValidationError } = require("./Responses");

class Validations {
    static validateRegisterPayload(req, res, next) {
        const schema = joi.object({
            name: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().required().min(8),
        });

        const { error } = schema.validate(req.body, { allowUnknown: true });

        if (error) {
            return handleValidationError(error, res);
        }

        next();
    }

    static validateLoginPayload(req, res, next) {
        const schema = joi.object({
            email: joi.string().email().required(),
            password: joi.string().required(),
        });

        const { error } = schema.validate(req.body, { allowUnknown: true });

        if (error) {
            return handleValidationError(error, res);
        }

        next();
    }

    static validateAddSavedEventPayload(req, res, next) {
        const schema = joi.object({
            eventId: joi.string().required(),
        });

        const { error } = schema.validate(req.body, { allowUnknown: true });

        if (error) {
            return handleValidationError(error, res);
        }

        next();
    }

    static validateNewEventPayload(req, res, next) {
        const schema = joi.object({
            name: joi.string().required(),
            description: joi.string().required(),
            artist: joi.string().required(),
            location: joi.string().required(),
            date: joi.date().required(),
            type: joi.string().valid("EDM", "Techno", "Hip-Hop").required(),
        });

        const { error } = schema.validate(req.body, { allowUnknown: true });

        if (error) {
            return handleValidationError(error, res);
        }

        next();
    }
}

module.exports = Validations;
