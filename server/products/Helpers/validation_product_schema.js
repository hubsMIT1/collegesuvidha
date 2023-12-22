const Joi = require("@hapi/joi");

const productSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().max(1000),
  category: Joi.string().required(),
  price: Joi.number().min(0).required(),
  quantity: Joi.number().min(0).required(),
  address: Joi.string().max(255),
  zipCode: Joi.string().min(0).max(20),
  // images: Joi.array().items(Joi.string()), // Assuming images are strings (file paths)
  // imagess: Joi.array().items(Joi.string().base64({ paddingRequired: true })),
  imagess: Joi.array().items(Joi.string().dataUri().max(1000000))
});

module.exports = { productSchema };

