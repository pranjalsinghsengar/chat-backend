const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});

mongoose
  .connect(
    "mongodb+srv://cluster0.h8dnflv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      dbName: "base0",
      user: "sengar",
      pass: "sengar123",
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Mongo Connected");
  })
  .catch((err) => {
    console.error(err);
  });

//   mongodb+srv://sengar:<password>@cluster0.h8dnflv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const UserRoute = require("./routes/User_route");
const User = require("./models/users");

app.use("/", UserRoute);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});


