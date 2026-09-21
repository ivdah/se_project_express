const ClothingItem = require("../models/clothingItem");
const { HTTP_STATUS } = require("../utils/errors");
const sendError = require("../utils/sendError");

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(HTTP_STATUS.OK).send(items))
    .catch((err) => sendError(res, err));
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
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
