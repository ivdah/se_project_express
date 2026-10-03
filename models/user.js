const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid email address",
    },
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, "The avatar field is required"],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  const unauthorizedError = () => {
    const error = new Error("Invalid email or password");
    error.name = "UnauthorizedError";
    return error;
  };

  if (typeof password !== "string") {
    return Promise.reject(unauthorizedError());
  }

  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(unauthorizedError());
      }

      return bcrypt.compare(password, user.password).then((passwordMatches) => {
        if (!passwordMatches) {
          return Promise.reject(unauthorizedError());
        }

        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
