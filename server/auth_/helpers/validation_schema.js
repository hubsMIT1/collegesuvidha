const Joi = require("@hapi/joi");

const authRegSchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().max(30),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(2).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});
const authLoginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(2).required()
})
const updateProfileSchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().max(30),
  email: Joi.string().email().lowercase().required(),
  contact: Joi.string().min(10).max(10),
  address: Joi.string().max(255),
})

module.exports = { authRegSchema,authLoginSchema,updateProfileSchema };
