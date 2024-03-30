require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const app = express();
const port = 8080;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extends: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
const jwt = require("jsonwebtoken");

mongoose
  .connect(
    "mongodb+srv://sengar:sengar123@cluster0.h8dnflv.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0"
    // {useNewUrIParser: true, useUnifiedTop010gy: true, useCreateIndex: true},
  )
  .then(() => {
    console.log("connected to Mongoose");
  })
  .catch((err) => {
    console.log("err in mongodb", err);
  });

app.listen(port, () => {
  app.listen(process.env.PORT || 3000, () => {
    console.log("server listening on port", port);
  });
});

const User = require("./models/users");
// const Message = require('./models/message');

// end points for ragistration of the user

const createToken = (userId) => {
  const payload = {
    userId: userId,
  };
  const token = jwt.sign(payload, "Q$r2K6W8n!jCW%Zk", { expireIn: "1h" });
  return token;
};

app.post("/register", async (req, res) => {
  const { name, email, password, image } = req.body;

  //   create new user
  const newUser = new User({
    name,
    email,
    password,
    image,
  });

  // save the user to the database

  await newUser
    .save()
    .then(() => {
      res.status(200).json({
        massage: "user registered ssdfuccessfully",
        user: { name, email, password, image },
      });
    })
    .catch((err) => {
      console.log("err in ragister user", err);
      res.status(500).json({ massage: "error in ragister user" });
    });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({ message: "email and password are required" });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        // if user not found
        return res.status(404).json({ message: "user not found" });
      }

      // compare
      if (user.password !== password) {
        return res.status(404).json({ message: "invalid password" });
      }
      res.status(200).json({message: 'user found', user});
      // const token = createToken(user._id);
      // res.status(200).json({token: token});
    })
    .catch((err) => {
      console.log("err in finding user", err);
      res.status(500).json({ message: "internal server error!" });
    });
});

app.get("/data", (req, res) => {});
