const express = require("express");
const { Query } = require("mongoose");
const router = express.Router();
const Book = require("../model/Book.js");
const { uploadFile } = require("../util/s3Bucket.js");
const multer = require("multer");

const upload = multer({ dest: "./uploads/" });

router.get("/api/book/list", (req, res) => {
  Book.find((err, result) => {
    if (err) throw err;
    res.json({ result: result });
  });
});

router.get("/api/book/find/", (req, res) => {
  let reqBody = req.body;
  console.log(typeof Boolean(req.query.exact));
  if (Boolean(!req.query.exact)) {
    for (field in reqBody) {
      reqBody[field] = { $regex: reqBody[field] };
    }
  }
  req.body
    ? Book.find(reqBody, (err, result) => {
        if (err) throw err.message;
        res.json({ result: result });
      })
    : res.status(400).end();
});

router.get("/api/book/findbyid/:id", (req, res) => {
  Book.findById(req.params.id, (err, result) => {
    if (err) throw res.status(404).json({ err: err.message });
    res.json({ result: result });
  });
});

router.post("/api/book/create", upload.single("image"), async (req, res) => {
  const uploadResult = await uploadFile(req.file);

  const saveBody = JSON.parse(req.body.bookData);
  saveBody.img = uploadResult.Location.toString();
  Book.create(saveBody, (err, result) => {
    if (err) res.status(400).json({ err: err.message });
    else {
      res.json({ result: result });
    }
  });
});

router.delete("/api/book/delete/:id", (req, res) => {
  Book.findByIdAndDelete(req.params.id, (err, result) => {
    if (err) res.status(400).json({ err: err.message });
    else {
      res.json({ result: result });
    }
  });
});

router.post("/api/book/update/id/:id", (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
    if (err) res.status(400).json({ err: err.message });
    else {
      res.json({ result: result });
    }
  });
});

module.exports = router;
