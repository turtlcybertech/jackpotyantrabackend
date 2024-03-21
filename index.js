const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

mongoose
    .connect(
        process.env.MONGO_DB_URL,
        { useNewUrlParser: true }
    )
    .then(() => console.log("Connected with Database"))
    .catch((err) => console.log(err));

app.use("/", require('./src/Routes/resultRoute'));
app.use("/", require('./src/Routes/adminRoutes'));
app.get("/", (req, res) => {
    res.send("<h1>Welcome to Jacport Yantra</h1>");
})
app.set("port", 9999);

app.listen(app.get("port"), () => {
    console.log("Express server listening on port " + app.get("port"));
});