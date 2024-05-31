const express = require("express");
const app = express();
const { getAllTopics } = require("./controllers/topics.controllers");
const { getApi } = require("./controllers/api.controllers");
const { getArticleById, getAllArticles  } = require("./controllers/articles.controllers");
const {getArticleComments} = require("./controllers/comments.controllers")

app.get("/api/topics", getAllTopics);

app.get("/api", getApi);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getAllArticles);

app.get("/api/articles/:article_id/comments", getArticleComments)

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    console.error(err);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

module.exports = app;
