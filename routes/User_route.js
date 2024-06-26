const express = require("express");
const router = express.Router();
const createErrors = require("http-errors");
const User = require("../models/users");
const mongoose = require("mongoose");

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email, password: password }, {});

    if (!user) {
      throw createErrors("404", "user not exist");
    }

    res.send(user);
  } catch (error) {
    console.log(error);
    if (error instanceof mongoose.CastError) {
      next(createErrors("404", "Invalid email"));
    }
    next(error);
  }
});

router.post("/search", async (req, res, next) => {
  const { name } = req.body;
  try {
    const user = await User.findOne({ name: name }, {});

    if (!user) {
      throw createErrors("404", "user not exist");
    }

    res.send(user);
  } catch (error) {
    console.log(error);
    if (error instanceof mongoose.CastError) {
      next(createErrors("404", "Invalid email"));
    }
    next(error);
  }
});

router.get("/users", async (req, res, next) => {
  try {
    const user = await User.find();

    if (!user) {
      throw createErrors("404", "user not exist");
    }
    res.send(user);
  } catch (error) {
    console.log(error);
    if (error instanceof mongoose.CastError) {
      next(createErrors("404", "Invalid email"));
    }
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user = await new User(req.body);
    const result = await user.save();
    res.send(result);
  } catch (error) {
    console.log(error);
  }

  // console.log(req.body);
  // const product = new User({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password,
  //   image: req.body.image,
  // });
  // product
  //   .save()
  //   .then((result) => {
  //     console.log(result);
  //     res.send(result);
  //   })
  //   .catch((err) => {
  //     console.log(err.message);
  //   });
});

router.post("/friend-request", async (req, res, next) => {
  const { currentUserId, selectedUserId } = req.body;

  try {
    await User.findByIdAndUpdate(selectedUserId, {
      $push: { friendRequest: currentUserId },
    });

    await User.findByIdAndUpdate(currentUserId, {
      $push: { sendFriendRequests: selectedUserId },
    });
    res.send({ status: "success" });
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get("/friend-request/:userId", async (req, res, next) => {
  const { userId } = req.params;

  const user = await User.findById(userId)
    .populate("friendRequest", "name email image")
    .lean();

  const friendRequest = user.friendRequest;

  res.json(friendRequest);
});

module.exports = router;
