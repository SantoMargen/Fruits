const User = require("../models/user");
const Role = require("../models/role");
const Family = require("../models/family");
const Fruit = require("../models/fruit");
const Genus = require("../models/genus");


const { comparePassword } = require("../helpers/bcrypt");
const { genereateToken } = require("../helpers/jwt");

class UserController {
    static async ragisterUser(req, res, next) {
        try {
            const { fullName, email, password, phoneNumber, address } = req.body;
            const payload = {
                fullName,
                email,
                password,
                phoneNumber,
                role_id: process.env.ROLE_USER,
                address
            };

            const data = await User.create(payload);
            let response = {
                statusDesc: "success",
                statusCode: 201,
                response: {
                    _id: data._id,
                    fullNmae: data.fullName,
                    email: data.email,
                    phoneumber: data.phoneNumber,
                    address: data.address
                }
            }
            res.status(201).json(response);
        } catch (err) {
            next(err);
        }
    }

    static async loginUser(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw { name: "EMPTY_DATA" };
            }

            const foundUser = await User.findOne({ email: email }).populate('role_id', 'title');

            if (!foundUser || !comparePassword(password, foundUser.password)) {
                throw { name: "USER_NOT_FOUND" };
            }

            const payload = {
                id: foundUser._id,
                fullName: foundUser.fullName,
                email: foundUser.email,
                role: foundUser.role_id.title
            };

            const token = genereateToken(payload);
            res.status(200).json({ id: foundUser.id, fullName: foundUser.fullName, access_token: token });
        } catch (err) {
            next(err);
        }
    }

    static async registerRoles(req, res, next) {
        try {
            const { title } = req.body;

            const data = await Role.create({ title });
            let response = {
                statusDesc: "success",
                statusCode: 201,
                response: data
            }
            res.status(201).json(response);
        } catch (err) {
            next(err);
        }
    }

    static async getFruits(req, res, next) {
        try {
            const fruits = await Fruit.find({}).populate('family_id', '-_id').populate('genus_id', '-_id ')

            res.status(200).json(fruits);
        } catch (err) {
            next(err)
        }
    }
}


module.exports = UserController