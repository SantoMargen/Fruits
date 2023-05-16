const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const genereateToken = (payload) => {
    return jwt.sign(payload, secret, { expiresIn: "24h" });
};
const verifyToken = (access_token) => {
    return jwt.verify(access_token, secret);
};

module.exports = {
    genereateToken,
    verifyToken,
};