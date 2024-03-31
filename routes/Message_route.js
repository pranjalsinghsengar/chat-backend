const express = require("express");
const router = express.Router();
const createErrors = require("http-errors");
const mongoose = require("mongoose");
const Message = require("../models/message");

router.post("/messages", async (req, res, next) => {
  //   const { senderId, recepientId, message } = req.body;
  try {
    const message = await new Message(req.body);
    const result = await message.save();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});
