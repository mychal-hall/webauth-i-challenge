const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../users/user-model.js");
const restricted = require("../auth/restrict-middleware.js");

// Allows a new user to register -- POST /api/auth -- requires username and a password
router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("logout", restricted, (req, res) => {
  if (req.session) {
    req.session.destroy(error => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Error" });
      }
      res.end();
    });
  } else {
    res.end();
  }
});

module.exports = router;
