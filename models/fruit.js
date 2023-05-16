const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"],
        },
        nutritions: {
            type: Object,
            required: [true, "nutritions is required"],
        },
        family_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'famillies',
            required: true
        },
        genus_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'genus',
            required: true,
        }
    },
    { timestamps: true }
);


const Fruit = mongoose.model('fruits', fruitSchema);

module.exports = Fruit;