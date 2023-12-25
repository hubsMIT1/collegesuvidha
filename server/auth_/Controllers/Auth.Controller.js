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
  updateProfileSchema,
} = require("../helpers/validation_schema");
const Admin = require('../admin/Admin.Model')
module.exports = {
  userData: async (req, res, next) => {
    id = req.params.id;
    const user = await User.findOne({_id:id });
    if (!user) throw createError.NotFound("User not registered");
    // console.log(user)
    const admin = await Admin.findOne({ adminId: id});
    const isAdminId = admin ? true : false;
    const ret = {firstName:user?.firstName, lastName:user?.lastName, email:user?.email,address:user?.address,contact:user?.contact};
    if(isAdminId){
      ret.isAdmin = true;
    }
    res.send(ret);
  },
  userSellerData: async(req,res,next)=>{
    id = req.params.id;
    try{

      const seller = await User.findOne({_id:id});
      if (!seller) throw createError.NotFound("User not registered");

      res.send(seller);

    }catch(err){
      next(err);
    }
  },
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
      const userId = savedUser.id
      res.clearCookie('refreshToken', { path: `/auth/refresh-token/${userId}` });
      res.status(200)
      .cookie('refreshToken', refreshToken,
       {sameSite:'strict', httpOnly: false, path: `/auth/refresh-token/${userId}` })
      .send({ accessToken, refreshToken, userId });
      // res.send(savedUser);
    } catch (error) {
      if (error.isJoi) error.status = 422;
      next(error);
    }
  },
  login: async (req, res, next) => {
    // res.send("login route");
    
    // console.log(req.cookies.refreshToken)
    try {
      const result = await authLoginSchema.validateAsync(req.body);
      const user = await User.findOne({ email: result.email });
      if (!user) throw createError.NotFound("User not registered");
      const isMatch = await user.isValidPassword(result.password);
      if (!isMatch)
        throw createError.Unauthorized("Username/password not valid");
      const accessToken = await signAccessToken(user.id);
      const refreshToken = await signRefreshToken(user.id);
      const userId = user.id;
      res.clearCookie('refreshToken', { path: `/auth/refresh-token/${userId}` });
      const admin = await Admin.findOne({ adminId: userId});
      const isAdminId = admin ? true : false;
      const ret = { accessToken,refreshToken, userId };
      if(isAdminId){
          ret.isAdmin = isAdminId;
      }
      res.status(200)
      .cookie('refreshToken', refreshToken,
       {sameSite:'strict', httpOnly: false })
      .send(ret);

    } catch (error) {
      if (error.isJoi)
        return next(createError.BadRequest("Invalid Username/Password"));
      next(error);
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const userId = req.payload.aud; 

      const validResult = await updateProfileSchema.validateAsync(req.body);
      const { firstName, lastName, contact, address } = validResult;

      const updateObject = {};
      if (firstName) updateObject.firstName = firstName;
      if (lastName) updateObject.lastName = lastName;
      if (contact) updateObject.contact = contact;
      if (address) updateObject.address = address;
  
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId }, 
        updateObject, 
        { new: true } 
      );
  
      if (!updatedUser) {
        return next(createError.NotFound("User not found"));
      }
      const admin = await Admin.findOne({ adminId: id});
    const isAdminId = admin ? true : false;
    const ret = {firstName:updatedUser?.firstName, lastName:updatedUser?.lastName, email:updatedUser?.email,address:updatedUser?.address,contact:updatedUser?.contact};
    if(isAdminId){
      ret.isAdmin = true;
    }
      res.status(200).send(ret);
    } catch (error) {
      next(error);
    }
  },
  accessToken:async(req,res,next)=>{
    try {
      res.status(200).json(req.payload);
    } catch (error) {
      next(error);
    }
  },
  refreshToken: async (req, res, next) => {
    if (!req.headers["authorization"]) return next(createError.Unauthorized());
    try {
      let refreshToken =req?.headers["authorization"]?.split(" ")[1];
      if (!refreshToken) throw createError.BadRequest();
      const userId = await verifyRefreshToken(refreshToken);
      const accessToken = await signAccessToken(userId);
      refreshToken = await signRefreshToken(userId);
      res.status(200).send({ accessToken,refreshToken, userId });
    } catch (error) {
      next(error);
    }
  },
  logout: async (req, res, next) => {
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

