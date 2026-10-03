const router = require("express").Router();

const { createUser, login } = require("../controllers/users");
const clothingItemsRouter = require("./clothingItems");
const usersRouter = require("./users");

router.post("/signup", createUser);
router.post("/signin", login);
router.use("/users", usersRouter);
router.use("/items", clothingItemsRouter);

module.exports = router;
