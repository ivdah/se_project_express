const ClothingItem = require("../models/clothingItem");
const { HTTP_STATUS } = require("../utiles/constants");

const sendError = (res, err) => {
  if (err.name === "ValidationError" || err.name === "CastError") {
    res.status(HTTP_STATUS.BAD_REQUEST).send({ message: err.message });
  } else if (err.name === "DocumentNotFoundError") {
    res.status(HTTP_STATUS.NOT_FOUND).send({ message: err.message });
  } else {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .send({ message: err.message });
  }
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
    { new: true, runValidators: true }
  )
    .orFail()
    .then((item) => res.status(HTTP_STATUS.OK).send(item))
    .catch((err) => sendError(res, err));
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true }
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
