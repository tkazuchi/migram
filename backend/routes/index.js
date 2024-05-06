const router = require('express').Router();
const userRouter = require("./users");
const postRouter = require("./posts");

router.use("/users", userRouter);
router.use("/posts", postRouter);

module.exports = router;