const express = require("express");
const router = express.Router();

const { verifyToken } = require("../util/tokenManager.js");

const additionalRoutes = ["/login"];

router.use("*", (req, res, next) => {
  console.log(req.headers);
  if (additionalRoutes.includes(req.baseUrl)) {
    next();
  } else {
    const token = req.headers.authorization?.substring(7);
    verifyToken(token) ? next() : res.status(403).end();
  }
});

module.exports = router;
