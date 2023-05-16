const mongoose = require('mongoose');
const validator = require('validator');
const { hashingPassword } = require('../helpers/bcrypt');

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "Fullname is required"],
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Email is required"],
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email is not valid');
                }

            },
            validate: {
                validator: async function (value) {
                    const email = await this.constructor.findOne({ email: value });
                    if (email) {
                        throw new Error(`${value} is already in use.`);
                    }
                }
            }
        },
        username: {
            type: String,
            required: [true, "username is required"],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Minimun code length 6 characters']
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
        },
        role_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "roles",
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    try {
        const user = this;
        if (!user.isModified('password')) return next();
        user.password = hashingPassword(user.password);
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('users', userSchema);

module.exports = User;