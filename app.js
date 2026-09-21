const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const { HTTP_STATUS } = require("./utils/errors");

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db").catch(console.error);

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133", // paste the _id of the test user created in the previous step
  };
  next();
});
app.use("/", mainRouter);

app.use((req, res) => {
  res
    .status(HTTP_STATUS.NOT_FOUND)
    .send({ message: "Requested resource not found" });
});

app.use((err, req, res, next) => {
  console.error(err.name);
  res
    .status(HTTP_STATUS.SERVER_ERROR)
    .send({ message: "An error has occurred on the server." });
  return next;
});

app.listen(PORT);
