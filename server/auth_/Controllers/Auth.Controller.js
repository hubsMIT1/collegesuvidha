const createError = require("http-errors");
const {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../helpers/jwt_helper");

const User = require("../Models/User.model");
const {
  authRegSchema,
  authLoginSchema,
} = require("../helpers/validation_schema");
module.exports = {
  register: async (req, res, next) => {
    console.log(req.body);
    // res.send('registration ');
    try {
      // const {firstName,lastName,email,password,confirmPassword} = req.body;
      // if(!email || !password){
      //     throw createError.BadRequest();
      // }
      const validResult = await authRegSchema.validateAsync(req.body);
      const doesExit = await User.findOne({ email: validResult.email });
      if (doesExit)
        throw createError.Conflict(
          `${validResult.email} is already been registered`
        );

      const user = new User(validResult);
      const savedUser = await user.save();
      const accessToken = await signAccessToken(savedUser.id);
      const refreshToken = await signRefreshToken(savedUser.id);

      res.send({ accessToken, refreshToken });
      // res.send(savedUser);
    } catch (error) {
      if (error.isJoi) error.status = 422;
      next(error);
    }
  },
  login: async (req, res, next) => {
    // res.send("login route");
    try {
      const result = await authLoginSchema.validateAsync(req.body);
      const user = await User.findOne({ email: result.email });
      if (!user) throw createError.NotFound("User not registered");
      const isMatch = await user.isValidPassword(result.password);
      if (!isMatch)
        throw createError.Unauthorized("Username/password not valid");

      const accessToken = await signAccessToken(user.id);
      const refreshToken = await signRefreshToken(user.id);

      res.send({ accessToken, refreshToken });
    } catch (error) {
      if (error.isJoi)
        return next(createError.BadRequest("Invalid Username/Password"));
      next(error);
    }
  },
  refreshToken: async (req, res, next) => {
    // res.send("refresh Token route");
    try {
      let { refreshToken } = req.body;
      if (!refreshToken) throw createError.BadRequest();
      const userId = await verifyRefreshToken(refreshToken);
      const accessToken = await signAccessToken(userId);
      refreshToken = await signRefreshToken(userId);
      res.send({ accessToken, refreshToken });
    } catch (error) {
      next(error);
    }
  },
  logout: async (req, res, next) => {
    // res.send("logout route");
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) throw createError.BadRequest();
      const userId = await verifyRefreshToken(refreshToken);
      if (!userId) throw createError.BadRequest();
      res.send(204);
    } catch (error) {
      next(error);
    }
  },
};
