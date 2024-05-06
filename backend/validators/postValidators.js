const z = require("zod");
const { ERROR_MESSAGES } = require("../utils/errorMessages");

const createPostValidator = z.object({
  image: z.string(),
  caption: z.string().optional()
});

module.exports = {
  createPostValidator
};
