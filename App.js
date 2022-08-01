const express = require("express");

const dotenv = require("dotenv").config();

const cors = require("cors");

const connectDb = require("./config/Database");

const AuthRoutes = require("./app/routes/AuthRoutes");

const UserRoutes = require("./app/routes/UserRoutes");

const EventRoutes = require("./app/routes/EventRoutes");

const app = express();

//app middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

//routes
app.use("/api/v1", AuthRoutes);
app.use("/api/v1", UserRoutes);
app.use("/api/v1", EventRoutes);

// 404 Error Handler
app.all("*", (req, res) => {
    res.status(404).json({
        status: false,
        error: "And Just Like That, You Completely Lost Your Way 😥",
        route: req.originalUrl,
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server is running on port " + port);
    connectDb();
});
