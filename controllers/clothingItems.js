const ClothingItem = require("../models/clothingItem");
const { HTTP_STATUS } = require("../utiles/constants");
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require("../utils/errors");

const sendError = (res, err) => {
  console.error(err.name);
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(BAD_REQUEST).send({ message: err.message });
  }
  if (err.name === "DocumentNotFoundError") {
    return res.status(NOT_FOUND).send({ message: err.message });
  }

  return res
    .status(SERVER_ERROR)
    .send({ message: "An error has occurred on the server." });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(HTTP_STATUS.OK).send(items))
    .catch((err) => sendError(res, err));
};

const createItem = (req, res) => {
  const { name, weather, imageUrl, owner } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(HTTP_STATUS.CREATED).send(item))
    .catch((err) => sendError(res, err));
};

const deleteItem = (req, res) => {
  ClothingItem.findByIdAndDelete(req.params.itemId)
    .orFail()
    .then((item) => res.status(HTTP_STATUS.OK).send(item))
    .catch((err) => sendError(res, err));
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(HTTP_STATUS.OK).send(item))
    .catch((err) => sendError(res, err));
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(HTTP_STATUS.OK).send(item))
    .catch((err) => sendError(res, err));
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
