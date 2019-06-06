const express = require("express");
const bcrypt = require("bcryptjs");
const Users = require("./user-model.js");

const router = express.Router();

router.post('/register', (req, res) => {
    let user = req.body;
  
    if(!user.username || !user.password) {
      return res.status(500).json({message: "Need username and password"});
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

// router export
module.exports = router;
