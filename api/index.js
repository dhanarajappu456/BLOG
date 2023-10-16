const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { User } = require("./model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const secret = process.env.JWT_SECRET;

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://" +
    process.env.DATABASE_USER_NAME +
    ":" +
    process.env.DATABASE_PASS +
    "@cluster0.e4dfukp.mongodb.net/?retryWrites=true&w=majority"
);

app.post("/register", (req, res) => {
  //write logic for adding user to the database
  //generate jwt token

  const { username, password } = req.body;
  console.log("username, pass from reg request", username, password, req.body);

  const result = bcrypt.hash(password, 10, async function (err, hash) {
    if (err) {
      console.log("error hashing the password", err);
      res.status(400).json({ message: "hashing error" });
    }
    try {
      userDoc = await User.create({ username: username, password: hash });
      res.json({ message: "sucees" });
    } catch (e) {
      if (username === "") {
        res.status(400).json({ message: "username cant be empty", e });
      } else {
        res.status(400).json({ message: "user duplicate error ", e });
      }
    }
  });
});

app.post("/login", async (req, res) => {
  try {
    const { userName, passWord } = req.body;
    console.log("userame & pass to login", userName, passWord);

    const userDoc = await User.findOne({ username: userName });
    console.log("ping", userName, req.body, userDoc);
    bcrypt.compare(passWord, userDoc.password, function (err, result) {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (result) {
        console.log("logged in...");
        jwt.sign(
          { userName: userName, id: userDoc._id },
          secret,
          {},
          (err, token) => {
            console.log("Inside JWT callback");
            if (err) {
              console.log("err jwt", err);
              res
                .status(500)
                .json({ message: "Internal Server Error....", err: err });
            } else {
              console.log(token);
              //response include set-cookie header in the respose with the new  token
              //with key as the name and value as the token value
              //receiving this token in the response header, browser
              //store it in cookies Storage

              res
                .cookie("token", token)
                .json({ userName: userName, id: userDoc._id });
            }
          }
        );
        // return res.json({ message: "Success Logging In..." });
      } else {
        console.log("failed!! check password");
        return res.status(401).json({ message: "Unauthorized Error" });
      }
    });
  } catch (error) {
    console.log("User not registered");
    return res.status(401).json({ message: "User not registered" });
  }
});

app.get("/profile", (req, res) => {
  //cookie parser set the cookies object in the request with the cookies
  // passed to the header in each request
  const token = req.cookies;
  console.log(typeof req.cookies, req.cookies);
  if ("token" in req.cookies) {
    const { token } = req.cookies;
    console.log("token", token);
    jwt.verify(token, secret, {}, (err, info) => {
      if (err) {
        console.log("error happened when verifying");
        res.status(500).json({ message: "Internal server error" });
      }
      return res.json({ userName: info.userName, id: info._id });
    });
  } else {
    console.log("empty", req.cookies);
    return res.json({});
  }
  // console.log("prof", req.cookies, token);
  // res.json(req.cookies);
});
app.get("/logout", (req, res) => {
  console.log("logging out");
  res.clearCookie("token");
  res.json("ok");
});
app.listen(4000);
