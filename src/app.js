const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded());

const tokenManager = require("./middleware/tokenFilter.js");
const homeView = require("./view/homeView.js");
const authView = require("./view/authView.js");
const bookView = require("./view/bookView.js");
const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: `*`,
  })
);
app.use(tokenManager);
app.use(homeView);
app.use(authView);
app.use(bookView);

const connectionUri = process.env.MONGODB_URI;

mongoose.connect(connectionUri).then(() => {
  app.listen(port, () => {
    console.log(`Listening ${port} port...`);
  });
});
