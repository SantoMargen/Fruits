
const mongoose = require("mongoose");

const mongoUrl = process.env.URI_MONGODB_LOCALHOST
const connectToMongo = () => {
    mongoose.connect(
        mongoUrl
    ).catch((e) => {
        console.log("error connecting to mongoose!");
    });
    mongoose.connection.on("error", (e) => {
        console.log(`mongo connect error! : ${e}`);
    });
    mongoose.connection.on("connected", () => {
        console.log("Mongoose is connected!!!!");
    });
};


module.exports = connectToMongo