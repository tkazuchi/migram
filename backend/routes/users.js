const router = require("express").Router();
const { User, Post } = require("../db");
const jwt = require("jsonwebtoken");
const { ERROR_MESSAGES } = require("../utils/errorMessages");
const { JWT_SECRET } = require("../config");
const bcrypt = require("bcrypt");

const { userSignupValidator, userSigninValidator } = require("../validators/userValidators");

//Sign Up Route
router.post("/signup", async (req, res) => {
  try {
    const body = req.body;
    const result = userSignupValidator.safeParse(body);

    if (!result.success) {
      const errors = result.error.errors.map((err) => err.message);
      return res.status(400).json({ errors });
    }

    const existingUser = await User.findOne({
      $or: [{ username: body.username }, { email: body.email }],
    });

    if (existingUser) {
      return res.status(411).json({
        message: ERROR_MESSAGES.USERNAME_OR_EMAIL_TAKEN,
      });
    }

    const user = await User.create({
      username: body.username,
      email: body.email,
      password: body.password,
      firstName: body.firstName,
      lastName: body.lastName,
    });

    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    res.json({
      message: ERROR_MESSAGES.USER_CREATED_SUCCESSFULLY,
      token: token,
    });
  } catch (error) {
    console.error(ERROR_MESSAGES.ERROR_SIGNING_UP);
    res.status(500).json({
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
});

//Sign In Route
router.post("/signin", async (req, res) => {
  try {
    const body = req.body;
    const result = userSigninValidator.safeParse(body);

    if (!result.success) {
      const errors = result.error.errors.map((err) => err.message);
      return res.status(400).json({ errors });
    }

    const { username, password } = body;
    //login via email or username
    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    }).select("+password");

    if(!user){
      return res.status(401).json({
        message: ERROR_MESSAGES.INVALID_USERNAME_OR_PASSWORD,
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: ERROR_MESSAGES.INVALID_USERNAME_OR_PASSWORD,
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(ERROR_MESSAGES.ERROR_SIGNING_IN + ":: " + error);
    res.status(500).json({
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(ERROR_MESSAGES.ERROR_RETRIEVING_USERS + ": ", error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
});

router.get("/:id", async (req, res) => {
  try{
    const id = req.params.id;
    const user = await User.findById(id);
    
    res.status(200).json(user)
  } catch (error){
    console.error(ERROR_MESSAGES.USER_NOT_FOUND + " : " + error);
    res.status(404).json({
      message: ERROR_MESSAGES.USER_NOT_FOUND
    })
  }
  


});

module.exports = router;
