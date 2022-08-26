const c = require("crypto-js");
const path = require("path");
module.exports = require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const saltKey = process.env.PASSWRD_SECRET;
const encrypt = (data) => c.SHA256(data + saltKey).toString(c.enc.Hex);

module.exports = { encrypt };
