const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

mongoose.connect(
  "mongodb+srv://stakezo64:dJzMJhWlJiDvxpVC@cluster0.2gsfbqz.mongodb.net/migram"
);

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    select: false,
    required: true,
    minLength: 8,
    maxLength: 50,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  followers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  following: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  posts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Post",
    default: [],
  },
  bio: {
    type: String,
    default: "",
    trim: true,
    maxLength: 500,
  },
});

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(this.password, salt);
    // Replace the plaintext password with the hashed one
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const postSchema = new mongoose.Schema({
  authodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  caption: {
    type: String,
    maxLength: 1000,
    default: "",
  },
  image: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

module.exports = {
  User,
  Post,
};
