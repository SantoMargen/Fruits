const errorHandler = (err, req, res, next) => {
    const error = {
        errorCode: 500,
        statusDesc: "error",
        success: false
    }
    console.log(err.name, "name");
    switch (err.name) {
        case "ValidationError":
            error.message = err.message
            error.errorCode = 400
            res.status(400).json(error);
            break;
        case "UNAUTHENTICATED":
            error.message = "wrong username/password"
            error.errorCode = 401
            res.status(401).json(error);
            break;
        case "ERROR_UPDATE":
            error.message = "Conflict"
            error.errorCode = 409
            res.status(409).json(error);
            break;
        case "AUTHORIZATION":
            error.message = "Forbidden"
            error.errorCode = 403
            res.status(403).json(error);
            break;
        case "JsonWebTokenError":
            error.message = "Invalid access_token"
            error.errorCode = 401
            res.status(401).json(error);
            break;

        default:
            error.message = "internal server error"
            res.status(500).json(error);
            break;
    }
};

module.exports = errorHandler;