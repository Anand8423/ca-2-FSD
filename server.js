const express = require("express");
const mongoose = require("mongoose");

const feedbackRoutes = require("./feedbackRoutes");

const app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/feedbackDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/api/feedback", feedbackRoutes);

app.listen(3000, () => {
    console.log("Server Running on http://localhost:3000");
});