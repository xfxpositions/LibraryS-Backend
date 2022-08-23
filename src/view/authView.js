const express = require("express");
const router = express.Router();
const User = require("../model/User.js");
const { createToken, parseToken } = require("../util/tokenManager.js");
const crypt = require("../util/cryptPassword");

router.post("/login", (req, res) => {
  const user = req.body;
  User.findOne(
    { name: user.username, password: crypt.encrypt(user.password) },
    (err, data) => {
      if (err) throw err;
      data ? res.json({ token: createToken({ data }) }) : res.status(404).end();
    }
  );
});

router.post("/register", (req, res) => {
  if (
    parseToken(req.headers.authorization.substring(7)).data.permissionLevel >= 3
  ) {
    const user = new User({
      name: req.body.username,
      password: crypt.encrypt(req.body.password),
      permissionLevel: req.body.permissionLevel,
    });
    User.findOne({ name: req.body.username }, (err, result) => {
      result
        ? res.status(409).json({ status: "username already exist" })
        : User.create(user, (err, result) => {
            if (err) throw err;
            res.json({ "user created!": result });
          });
    });
  } else {
    console.log("permission denied");
    res.status(403).end();
  }
});

module.exports = router;
