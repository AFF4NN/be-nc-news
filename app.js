const express = require("express");
const app = express();
const { getAllTopics } = require("./controllers/topics.controllers");

app.get("/api/topics", getAllTopics);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
