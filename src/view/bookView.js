const express = require("express");
const { Query } = require("mongoose");
const router = express.Router();
const Book = require("../model/Book.js");

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

router.post("/api/book/create", (req, res) => {
  Book.create(req.body, (err, result) => {
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
