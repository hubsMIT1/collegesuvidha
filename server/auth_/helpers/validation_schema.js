const Joi = require('@hapi/joi');

const authSchema = Joi.object({
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName:Joi.string().alphanum().max(30),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(2).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    
})

module.exports = {authSchema, }