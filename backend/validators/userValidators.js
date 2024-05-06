const z = require("zod");
const { ERROR_MESSAGES } = require("../utils/errorMessages");


const passwordSchema = z
  .string()
  .min(8, { message: ERROR_MESSAGES.PASSWORD_MIN_LENGTH_8 })
  .max(50, { message: ERROR_MESSAGES.PASSWORD_MAX_LENGTH_50 });


const userSignupValidator = z.object({
  email: z.string().email(),
  username: z.string(),
  password: passwordSchema,
  firstName: z.string(),
  lastName: z.string(),
});


module.exports = {
    userSignupValidator: userSignupValidator
}
