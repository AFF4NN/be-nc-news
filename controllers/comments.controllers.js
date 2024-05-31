const { response } = require("../app");
const {getArticleComments} = require("../models/comments.models")

exports.getArticleComments = (req, res, next) => {
    const {article_id} = req.params;
    if (isNaN(article_id)){
        return res.status(400).send({msg: "Bad Request"})
    }
    getArticleComments(article_id)
    .then((result) => {
        // console.log(result, "FROM CONTROLLER");
        if(result.length === 0){
            return res.status(200).send({msg: "No Comments"})
        }
         res.status(200).send({comments:result})
    })
    .catch((err) => {
     res.status(500).send(err) 
    })
}