const jwt = require("jsonwebtoken");
const { ERROR_MESSAGES } = require("./utils/errorMessages");
const { JWT_SECRET } = require("./config");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS });
  }

  const authParts = authHeader.split(" ");

  if (authParts.length !== 2 || authParts[0] !== "Bearer") {
    return res
      .status(401)
      .json({ message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS });
  }

  token = authParts[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message:
          ERROR_MESSAGES.UNAUTHORIZED_ACCESS + ERROR_MESSAGES.INVALID_TOKEN,
      });
    }
    req.userId = decoded.userId;
    next();
  });
};

module.exports = {
  verifyToken,
};
