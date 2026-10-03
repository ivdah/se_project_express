const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const { HTTP_STATUS } = require("./utils/errors");

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db").catch(console.error);

app.use(express.json());
app.use(cors());
app.use("/", mainRouter);

app.use((req, res) => {
  res
    .status(HTTP_STATUS.NOT_FOUND)
    .send({ message: "Requested resource not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(HTTP_STATUS.SERVER_ERROR)
    .send({ message: "An error has occurred on the server." });
  return next;
});

app.listen(PORT);
