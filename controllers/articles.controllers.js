const { fetchArticleById, fetchAllArticles } = require("../models/articles.models");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  if (isNaN(article_id)) {
    return res.status(400).send({ msg: "Bad Request" });
  }

  fetchArticleById(article_id)
    .then((article) => {
      if (!article) {
        return ({ status: 404, msg: "Article not found" });
      }
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getAllArticles = (req, res, next) => {
    fetchAllArticles()
      .then((articles) => {
        res.status(200).send({ articles });
      })
      .catch((err) => {
        next(err);
      });
  };
