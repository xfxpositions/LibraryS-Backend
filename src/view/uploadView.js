const express = require("express");
const multer = require("multer");

const upload = multer({ dest: "./uploads/" });
const router = express.Router();

const { uploadFile } = require("../util/s3Bucket.js");

router.post("/upload", upload.single("image"), async (req, res) => {
  await uploadFile(req.file);

  res.end();
});

module.exports = router;
