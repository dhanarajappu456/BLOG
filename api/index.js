const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { User } = require("./model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
//multer need to process the multipart/form-data from the http request
//which has file upload,
// it processes the incoming request data and
//attaches the uploaded files to the req object.
//so that we can access  the file
const multer = require("multer");
const uploadMiddleWare = multer({ dest: "upload/" });
const fs = require("fs");
require("dotenv").config();
const { Post } = require("./model/Posts");

app.use("/upload", express.static(__dirname + "/upload/"));

const secret = process.env.JWT_SECRET;
function generateToken(userName, userDoc, res) {
  jwt.sign(
    { userName: userName, id: userDoc._id },
    secret,
    {},
    (err, token) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Internal Server Error....", err: err });
      } else {
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
}
app.use(
  cors({
    credentials: true,
    origin: "https://blog-front-roan.vercel.app",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',

  })
);

// app.use(cors());

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

  const result = bcrypt.hash(password, 10, async function (err, hash) {
    if (err) {
      res.status(400).json({ message: "hashing error" });
    }
    try {
      userDoc = await User.create({ username: username, password: hash });

      generateToken(username, userDoc._id, res);
    } catch (e) {
      if (username === "") {
        res.status(400).json({ message: "username cant be empty", e: e });
      } else {
        res.status(400).json({ message: "user duplicate error ", e: e });
      }
    }
  });
});

app.post("/login", async (req, res) => {
  try {
    const { userName, passWord } = req.body;

    const userDoc = await User.findOne({ username: userName });

    bcrypt.compare(passWord, userDoc.password, function (err, result) {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (result) {
        generateToken(userName, userDoc, res);

        // return res.json({ message: "Success Logging In..." });
      } else {
        return res.status(401).json({ message: "Unauthorized Error" });
      }
    });
  } catch (error) {
    return res.status(401).json({ message: "User not registered" });
  }
});

app.get("/profile", (req, res) => {
  //cookie parser set the cookies object in the response of /login
  // the setcookies with token is send in the response
  // which inturn would have set the cookies in the cookies storage of the browser

  const token = req.cookies;

  if ("token" in req.cookies) {
    const { token } = req.cookies;

    jwt.verify(token, secret, {}, (err, info) => {
      if (err) {
        res.status(500).json({ message: "Internal server error" });
      }

      return res.json({ userName: info.userName, id: info.id });
    });
  } else {
    return res.json({});
  }
  //
  // res.json(req.cookies);
});
app.get("/logout", (req, res) => {
  //clears the cookie in the user re
  res.clearCookie("token");
  res.json("ok");
});
app.post("/post", uploadMiddleWare.any(), async (req, res) => {
  const { path, originalname } = req.files[0];
  const extension = originalname.split(".")[1];

  const newPath = path + "." + extension;

  // the file put in to uploads had no extension , so we renamw it by appending
  //extension of the actual file
  fs.renameSync(path, newPath);

  if ("token" in req.cookies) {
    const { token } = req.cookies;

    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorised access" });
      }

      const { title, summary, content } = req.body;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id,
      });
      res.json({ success: postDoc, fo: req.files });
      // return res.json({ userName: info.userName, id: info._id });
    });
  } else {
    return res.json({});
  }
});

app.get("/posts", uploadMiddleWare.any(), async (req, res) => {
  // sort the post from latest to oldest and limit the number of documents
  //returned to 10
  const posts = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(posts);
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id).populate("author", ["_id", "username"]);
  res.json(post);
});
app.put("/editPost/:id", uploadMiddleWare.any(), (req, res) => {
  //take the userinfo from the token

  const { token } = req.cookies;
  const { id: postId } = req.params;

  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorised access" });
    }

    try {
      const postDoc = await Post.findById(postId);

      if (String(postDoc.author._id) === info.id) {
        const { title, summary, content } = req.body;
        postDoc.title = title;
        postDoc.summary = summary;
        postDoc.content = content;

        //update file if it is uploaded
        if (req.files[0]) {
          const { path, originalname } = req.files[0];
          const extension = originalname.split(".")[1];

          const newPath = path + "." + extension;

          // the file put in to uploads had no extension , so we renamw it by appending
          //extension of the actual file
          fs.renameSync(path, newPath);
          postDoc.cover = newPath;
        }

        postDoc.save();
        return res.json({ message: "Success editing" });
      } else {
        return res.status(401).json({ message: "Unauthorised access" });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }

    const { title, summary, content } = req.body;

    res.json({ success: postDoc, fo: req.files });
    // return res.json({ userName: info.userName, id: info._id });
  });
});

//verify the user with jwt , - for authenticity and integrity

//if not verfied , say you are not verified
//if verified user then compare the post.author is the same user
// if sucess promote update and send the succes s
//only update non empty values
// else say not authorised

app.listen(4000);
