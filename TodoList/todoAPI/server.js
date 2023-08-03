require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const connectDB = require("./dbConn");
const mongoose = require("mongoose");
const mongodb = require("mongodb");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4500;

connectDB();

app.use(cors());

app.use(express.json());

// Routes
app.use("/", require("./routes/root"));
app.use("/todo", require("./routes/todo"));

// Error catching if user navigates to unknown route
app.all("*", (req, res) => {
  res.status(400);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

// Initialise the server and make connection to the database
mongoose.connection.once("open", () => {
  console.log("Successfull connected to MongoDB");
  app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
});

module.exports = app;
