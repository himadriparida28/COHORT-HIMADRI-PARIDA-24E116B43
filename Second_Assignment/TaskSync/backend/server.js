const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { initDatabase } = require("./controllers/initDb");
const db = require('./models/connection.js');
const { authRoute } = require("./routes/authRoute");
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
initDatabase();
app.get("/", (req, res) => {
    res.json({
        status: "success",
        message: "TaskSync API is running"
    });
});
app.use("/api/auth", authRoute);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});