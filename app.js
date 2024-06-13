const express = require("express");
const app = express();
const { getAllTopics } = require("./controllers/topics.controllers");
const { getApi } = require("./controllers/api.controllers");
const { getArticleById, getAllArticles  } = require("./controllers/articles.controllers");
const {getArticleComments, postArticleComments, patchArticleComments, deleteArticleComment } = require("./controllers/comments.controllers")

app.get("/api/topics", getAllTopics);

app.get("/api", getApi);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getAllArticles);

app.get("/api/articles/:article_id/comments", getArticleComments)

app.post('/api/articles/:article_id/comments', postArticleComments)

app.patch('/api/articles/:article_id', patchArticleComments)

app.delete("/api/comments/:comment_id", deleteArticleComment)


app.all('*', (req, res) => {
  res.status(404).send({ msg: 'Route not found' });
});


app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request: Invalid input syntax" });
  } else if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    console.error(err);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

module.exports = app;
