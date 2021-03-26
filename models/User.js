const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      max: 225,
    },
    email: {
      type: String,
      required: true,
      max: 65,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("User", userSchema)
