const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../Models/User.model");
const { authSchema } = require("../helpers/validation_schema");
const {signAccessToken} = require('../helpers/jwt_helper');

router.post("/register", async (req, res, next) => {
  console.log(req.body);
  // res.send('registration ');
  try {
    // const {firstName,lastName,email,password,confirmPassword} = req.body;
    // if(!email || !password){
    //     throw createError.BadRequest();
    // }
    const validResult = await authSchema.validateAsync(req.body);
    const doesExit = await User.findOne({ email: validResult.email });
    if (doesExit)
      throw createError.Conflict(
        `${validResult.email} is already been registered`
      );

    const user = new User(validResult);
    const savedUser = await user.save();
    const accessToken = await signAccessToken(savedUser.id);
    res.send({accessToken});
    // res.send(savedUser);
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
});
router.post("/login", async (req, res, next) => {
  res.send("login route");
});

router.post("/refresh-token", async (req, res, next) => {
  res.send("refresh Token route");
});

router.delete("/logout", async (req, res, next) => {
  res.send("logout route");
});

module.exports = router;
