const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please add an email address"],
      unique: true,
    },
    username: {
      type: String,
      unique: true,
      required: [true, "Please add a username"],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
