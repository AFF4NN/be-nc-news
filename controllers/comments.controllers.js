const { response } = require("../app");
const {getArticleComments, postArticleComments1, patchArticleComments2, deleteArticleComment3} = require("../models/comments.models")

exports.getArticleComments = (req, res, next) => {
    const {article_id} = req.params;
    if (isNaN(article_id)){
        return res.status(400).send({msg: "Bad Request"})
    }
    getArticleComments(article_id)
    .then((result) => {
       
        if(result.length === 0){
            return res.status(200).send({msg: "No Comments"})
        }
         res.status(200).send({comments:result})
    })
    .catch((err) => {
     res.status(500).send(err) 
    })
}

exports.postArticleComments = (req, res, next) => {
    const { article_id } = req.params;
    const newComment = req.body;
    
    if (!newComment.username || !newComment.body) {
        return res.status(400).send({ msg: "Bad Request: Missing username or body" });
    }

    postArticleComments1(article_id, newComment)
        .then((comment) => {
            res.status(201).send({ comment });
        })
        .catch(next);
};

// Update the vote count for an article
exports.patchArticleComments = (req, res, next) => {
    const { article_id } = req.params;
    const { inc_votes } = req.body;

    if (typeof inc_votes !== 'number') {
        return res.status(400).send({ msg: "Bad Request: inc_votes must be a number" });
    }

    patchArticleComments2(article_id, inc_votes)
    .then((article) => {
        res.status(200).send({ article });
    })
    .catch((err) => {
        next(err);
    });
};


// Delete a comment by its ID
exports.deleteArticleComment = (req, res, next) => {
    const { comment_id } = req.params;
    
    if (isNaN(comment_id)) {
      return res.status(400).send({ msg: "Bad Request" });
    }
    
    deleteArticleComment3(comment_id)
      .then((comment) => {
        if (!comment) {
          return res.status(404).send({ msg: "Comment not found" });
        }
        res.status(204).send();
      })
      .catch((err) => {
        next(err);
      });
  };
  