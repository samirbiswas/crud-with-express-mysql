const validator = require("validator").default;

const { isEmpty } = require("../../utils");

module.exports = function validateSignup(data) {
  const errors = {};

  data.username = !isEmpty(data.username)
    ? validator.escape(data.username)
    : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password)
    ? validator.escape(data.password)
    : "";
  data.confirm_password = !isEmpty(data.confirm_password)
    ? validator.escape(data.confirm_password)
    : "";

  //username validation
  if (validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  } else if (!validator.isLength(data.username, { min: 3, max: 30 })) {
    errors.username = "Username must be min 3 and max 30 characters";
  } else if (!validator.isAlphanumeric(data.username)) {
    errors.username = "Username can have only alphanumeric values";
  }
  // Email Validation
  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Email is not valid";
  }
  // password validation
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  } else if (!validator.isLength(data.password, { min: 6 })) {
    errors.password = "Pasword must be min 6 charcters";
  } else if (!validator.equals(data.password, data.confirm_password)) {
    errors.confirm_password = "Password does not match";
  }
  return {
    errors,
    isValid: isEmpty(errors),
    data,
  };
};
