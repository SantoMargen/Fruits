const mongoose = require('mongoose');

const rolesSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        }
    },
    { timestamps: true }
);

const Roles = mongoose.model('roles', rolesSchema);

module.exports = Roles;