const mongoose = require('mongoose');

const genusSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        }
    },
    { timestamps: true }
);

const Genus = mongoose.model('genus', genusSchema);

module.exports = Genus;