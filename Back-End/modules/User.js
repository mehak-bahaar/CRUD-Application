const mongoose = require("mongoose");
const { Schema } = mongoose;
// creating the schema for the user inter login
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
//exporting the module
const User =  mongoose.model("user", UserSchema)
module.exports =User;
