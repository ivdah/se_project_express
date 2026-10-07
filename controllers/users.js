const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { HTTP_STATUS } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");
const sendError = require("../utils/sendError");

const createUser = (req, res) => {
  const { email, password, name, avatar } = req.body;

  if (
    typeof email !== "string" ||
    email.trim() === "" ||
    typeof password !== "string" ||
    password.length === 0
  ) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .send({ message: "Invalid data" });
  }

  return bcrypt
    .hash(password, 10)
    .then((hashedPassword) =>
      User.create({ email, password: hashedPassword, name, avatar })
    )
    .then((user) => {
      const userData = user.toObject();
      delete userData.password;
      return res.status(HTTP_STATUS.CREATED).send(userData);
    })
    .catch((err) => sendError(res, err));
};

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .send({ message: "Email and password are required" });
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(HTTP_STATUS.OK).send({ token });
    })
    .catch((err) => sendError(res, err));
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .select("-password")
    .orFail()
    .then((user) => res.status(HTTP_STATUS.OK).send(user))
    .catch((err) => sendError(res, err));
};

const updateCurrentUser = (req, res) => {
  const updates = {};
  ["name", "avatar"].forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  })
    .select("-password")
    .orFail()
    .then((user) => res.status(HTTP_STATUS.OK).send(user))
    .catch((err) => sendError(res, err));
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateCurrentUser,
};
