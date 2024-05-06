const { default: mongoose } = require("mongoose");
const { Post, User } = require("../db");
const { verifyToken } = require("../middlewares");
const { ERROR_MESSAGES } = require("../utils/errorMessages");
const { createPostValidator } = require("../validators/postValidators");

const router = require("express").Router();

router.post("/", verifyToken, async (req, res) => {
  const { image, caption } = req.body;
  const result = createPostValidator.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.errors.map((err) => err.message);
    return res
      .status(400)
      .json({ message: ERROR_MESSAGES.INVALID_INPUT_FOR_CREATE_POST });
  }

  const userId = req.userId;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const post = await Post.create({
      authodId: userId,
      image,
      caption,
    });

    await User.findByIdAndUpdate(
      userId,
      {
        $push: { posts: post._id },
      },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: ERROR_MESSAGES.POST_CREATED, post });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error(ERROR_MESSAGES.ERROR_RETRIEVING_POSTS + ": ", error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
});
module.exports = router;
