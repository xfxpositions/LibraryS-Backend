const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const tokenSecret = process.env.TOKENSECRET;

const createToken = (payload) => {
  const token = jwt.sign(payload, tokenSecret, {
    expiresIn: "1h",
    issuer: "LibraryS system",
  });
  return token;
};

const verifyToken = (token) => {
  try {
    const res = jwt.verify(token, tokenSecret);
    return res;
  } catch (e) {
    console.log(`jwt error: ${e}`);
    return false;
  }
};

function parseToken(token) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

module.exports = {
  createToken,
  verifyToken,
  parseToken,
};
