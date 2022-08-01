class Response {
    static makeResponse(status, message, data) {
        if (status) {
            return {
                status,
                message,
                data,
            };
        }
        return {
            status,
            message,
            data,
        };
    }

    static sendSuccessResponse(res, message, data, statusCode = 200) {
        return res.status(statusCode).json({
            status: true,
            message,
            data,
        });
    }

    static sendErrorResponse(res, message, data, statusCode = 500) {
        return res.status(statusCode).json({
            status: false,
            message,
            data,
        });
    }

    static handleValidationError(validatedData, res) {
        const message = validatedData.details[0].message;
        return res.status(400).json({
            status: false,
            message,
            data: {},
        });
    }
}

module.exports = Response;
