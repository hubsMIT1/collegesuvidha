const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    adminId: {
      type: String,
    //   required: true,
    },
})
const Admin = mongoose.model("adminIds", AdminSchema);
module.exports = Admin;