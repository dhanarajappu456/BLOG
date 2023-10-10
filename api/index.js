const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { User } = require("./model/User");
require("dotenv").config();
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://" +
    process.env.DATABASE_USER_NAME +
    ":" +
    process.env.DATABASE_PASS +
    "@cluster0.e4dfukp.mongodb.net/?retryWrites=true&w=majority"
);

app.post("/register", async (req, res) => {
  //write logic for adding user to the database
  //generate jwt token

  const { username, password } = req.body;
  try {
    const userDoc = await User.create({ username, password });
    res.json(userDoc);
  } catch (e) {
    console.log("error from mongoose create");
    res.status(400).json(e);
  }
});

app.get("/login", (req, res) => {
  //make user logged in if aready registered
  //generate jwt token
  //else throw an error

  console.log("ping");
  res.json({ name: "test ok" });
});
app.listen(4000);
