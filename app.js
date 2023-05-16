if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const cors = require("cors");
const express = require("express");
const app = express();
const connectToMongo = require('./config/configMongoDb')
const port = process.env.PORT || 4000;
const errorHandler = require("./middlewares/errorhanlder");
const router = require("./routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectToMongo()


app.use("/", router);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`server is up on http://localhost:${port}`);
});
