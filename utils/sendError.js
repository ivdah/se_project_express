const { HTTP_STATUS } = require("./errors");

const sendError = (res, err) => {
  console.error(err.name);
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .send({ message: "Invalid data" });
  }
  if (err.name === "DocumentNotFoundError") {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .send({ message: "Requested resource not found" });
  }

  return res
    .status(HTTP_STATUS.SERVER_ERROR)
    .send({ message: "An error has occurred on the server." });
};

module.exports = sendError;
