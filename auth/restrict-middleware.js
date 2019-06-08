const bcrypt = require("bcryptjs");

const Users = require("../users/user-model.js");

module.exports = (req, res, next) => {
  if (req.session && req.sesion.user) {
    next();
  } else {
    res
      .status(401)
      .json({ message: "Access Denied - Self Destruct Initiated." });
  }
};
