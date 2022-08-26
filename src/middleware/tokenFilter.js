const express = require("express");
const router = express.Router();

const { verifyToken } = require("../util/tokenManager.js");

const additionalRoutes = ["/login", "/upload"];

router.use("*", (req, res, next) => {
  if (additionalRoutes.includes(req.baseUrl)) {
    console.log("additional routes");
    next();
  } else {
    const token = req.headers.authorization?.substring(7);
    verifyToken(token) ? next() : res.status(403).end();
  }
});

module.exports = router;
