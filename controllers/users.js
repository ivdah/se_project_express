const User = require("../models/user");
const { HTTP_STATUS } = require("../utils/errors");
const sendError = require("../utils/sendError");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(HTTP_STATUS.OK).send(users))
    .catch((err) => sendError(res, err));
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(HTTP_STATUS.CREATED).send(user))
    .catch((err) => sendError(res, err));
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(HTTP_STATUS.OK).send(user))
    .catch((err) => sendError(res, err));
};

module.exports = {
  getUsers,
  createUser,
  getUser,
};
