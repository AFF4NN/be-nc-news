const db = require("../db/connection");

exports.getArticleComments = (article_id) => {
    return db.query("SELECT * FROM COMMENTS WHERE article_id = $1;", [article_id])
    .then((result) => {
        // console.log(result.rows, "FROM MODEL");
        return result.rows}
    )
}