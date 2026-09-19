const User = require("../models/user");
const { HTTP_STATUS } = require("../utiles/constants");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(HTTP_STATUS.OK).send(users))
    .catch((err) =>
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send({ message: err.message })
    );
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(HTTP_STATUS.CREATED).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(HTTP_STATUS.BAD_REQUEST).send({ message: err.message });
      } else {
        res
          .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
          .send({ message: err.message });
      }
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(HTTP_STATUS.OK).send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(HTTP_STATUS.BAD_REQUEST).send({ message: err.message });
      } else if (err.name === "DocumentNotFoundError") {
        res.status(HTTP_STATUS.NOT_FOUND).send({ message: err.message });
      } else {
        res
          .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
          .send({ message: err.message });
      }
    });
};

module.exports = {
  getUsers,
  createUser,
  getUser,
};
