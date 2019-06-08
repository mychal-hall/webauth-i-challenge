const express = require("express");
const bcrypt = require("bcryptjs");
const Users = require("./user-model.js");

const router = express.Router();

router.post("/register", (req, res) => {
  let user = req.body;

  if (!user.username || !user.password) {
    return res.status(500).json({ message: "Need username and password" });
  }

  // user.username
  // user.password
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  Users.insert(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/users", authcheck, (req, res) => {
  Users.get()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.send(error);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.getBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: "Invalid username or password." });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// middleware
function authcheck(req, res, next) {
    const username = req.headers['x-username']
    const password = req.headers['x-password']

    if(username && password) {
        Users.getBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                next()
            } else {
                res.status(401).json({ message: "Invalid username or password" })
            }
        })
        .catch (error => {
            res.status(500).json(error)
        })
    } else {
        res.status(400).json({ message: "Please use a proper username and password" })
    }
}

// router export
module.exports = router;
