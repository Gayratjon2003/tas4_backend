const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1024,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Blocked"],  
    required: true,
  },
  lastLoginTime: {
    type: String,
    required: true
  },
  registerTime: {
    type: String,
    required: true
  }
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      isAdmin: this.isAdmin,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(1).max(255).required(),
    isAdmin: Joi.boolean().required(),
    status: Joi.string().required(),
  };

  return Joi.validate(user, schema);
}
function validateUserPut(user) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    isAdmin: Joi.boolean().required(),
    status: Joi.string().required(),
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
exports.validateUserPut = validateUserPut;
