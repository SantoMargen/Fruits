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
            const { fullName, username, email, password, phoneNumber, address } = req.body;
            const payload = {
                fullName,
                username,
                email,
                password,
                phoneNumber,
                role_id: process.env.ROLE_USER,
                address
            };

            const data = await User.create(payload);
            let response = {
                statusCode: 201,
                statusDesc: "success",
                success: true,
                response: { data }
            }
            res.status(201).json(response);
        } catch (err) {
            next(err);
        }
    }

    static async loginUser(req, res, next) {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                throw { name: "EMPTY_DATA" };
            }

            const foundUser = await User.findOne({ username: username }).populate('role_id', 'title');

            if (!foundUser || !comparePassword(password, foundUser.password)) {
                throw { name: "USER_NOT_FOUND" };
            }

            const payload = {
                id: foundUser._id,
                fullName: foundUser.fullName,
                username: username,
                email: foundUser.email,
                role: foundUser.role_id.title
            };

            const token = genereateToken(payload);
            res.status(200).json(
                {
                    id: foundUser.id,
                    fullName: foundUser.fullName,
                    username: foundUser.username,
                    access_token: token
                });
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

    static async createFruits(req, res, next) {
        try {
            const { name, family_id, genus_id, nutritions } = req.body;
            const payload = {
                name,
                family_id,
                genus_id,
                nutritions
            }

            const data = await Fruit.create(payload);
            let response = {
                statusCode: 201,
                statusDesc: "success",
                success: true,
                response: { data }
            }
            res.status(201).json(response);
        } catch (err) {
            next(err)
        }
    }

    static async updateFruit(req, res, next) {
        try {
            const { fruitId } = req.params
            const fruit = await Fruit.findById(fruitId)

            fruit.name = req.body.name ? req.body.name : fruit.name;
            fruit.family_id = req.body.family_id ? req.body.family_id : fruit.family_id;
            fruit.genus_id = req.body.genus_id ? req.body.genus_id : fruit.genus_id;
            fruit.nutritions = req.body.nutritions ? req.body.nutritions : fruit.nutritions;

            await Fruit.findByIdAndUpdate({ _id: fruitId },
                { $set: { name: fruit.name, family_id: fruit.family_id, genus_id: fruit.genus_id, nutritions: fruit.nutritions } },
                { new: true })

            let response = {
                statusCode: 200,
                statusDesc: "success",
                success: true,
                response: { message: "Fruit has been updated" }
            }
            res.status(201).json(response);
        } catch (err) {
            next(err)
        }
    }

    static async deleteFruit(req, res, next) {
        try {
            const { fruitId } = req.params
            await Fruit.findByIdAndDelete(fruitId)

            let response = {
                statusCode: 200,
                statusDesc: "success",
                success: true,
                response: { message: "Fruit has been deleted" }
            }

            res.status(201).json(response);
        } catch (err) {
            next(err)
        }
    }
}


module.exports = UserController