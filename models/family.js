const mongoose = require('mongoose');

const familySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        }
    },
    { timestamps: true }
);

const Family = mongoose.model('families', familySchema);

module.exports = Family;