const errorHandler = (err, req, res, next) => {
    switch (err.name) {
        case "ValidationError":
            res.status(400).json({
                "statusDesc": "error",
                "statusCode": 400,
                "response": { message: err.message }
            });
            break;
        case "UNAUTHENTICATED":
            res.status(401).json({ message: "Login first" });
            break;
        case "JsonWebTokenError":
            res.status(401).json({ message: "Invalid access_token" });
            break;

        default:
            res.status(500).json({ message: "internal server error" });
            break;
    }
};

module.exports = errorHandler;