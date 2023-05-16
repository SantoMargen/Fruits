const { verifyToken } = require("../helpers/jwt");
const User = require("../models/user");

const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers;
        if (!access_token) {
            throw { name: "UNAUTHENTICATED" };
        }
        const payload = verifyToken(access_token);
        const verifyUser = await User.findOne({ _id: payload.id }).populate('role_id', 'title').exec()

        if (!verifyUser) {
            throw { name: "AUTHENTICATION" };
        }
        req.user = {
            id: verifyUser._id,
            fullName: verifyUser.fullName,
            email: verifyUser.email,
            role: verifyUser.role_id.title
        };
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = { authentication };