const express = require("express");
const app = express();
const  {getAllTopics} = require("./controllers/topics.controllers");
const { getApi } = require("./controllers/api.controllers");

app.get("/api/topics", getAllTopics);

app.get("/api", getApi);



app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;

