const Admin = require("./Admin.Model");
const createError = require("http-errors");

module.exports = {
  addNewAdmin: async (req, res, next) => {
    try {
      const { adminId } = req?.body;

      // Create a new admin instance
      const newAdmin = new Admin({
        adminId,
      });

      // Save the admin to the database
      await newAdmin.save();

      res.status(200).json({ message: "Admin ID added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  verifyAdmin: async (req, res, next) => {
    try {
      const userId = req?.payload?.aud;

      // Find the admin in the database
      const admin = await Admin.findOne({ adminId: userId });

      if (admin) {
        // res.status(200).json({ isAdmin: true });
        // return true;
        req.user.admin = true;
      }
      //  else {
      //   return next(createError.Unauthorized());
      //   // return false;
      // }
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
