const db = require("../db/connection");

exports.getArticleComments = (article_id) => {
    return db.query(
        "SELECT comment_id, votes, created_at, author, body, article_id FROM COMMENTS WHERE article_id = $1 ORDER BY created_at DESC;", 
        [article_id]
    )
    .then((result) => {
        return result.rows;
    });
}

exports.postArticleComments1 = (article_id, newComment) => {
    const {username, body} = newComment
    return db
    .query("INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3) RETURNING *;", [body, username, article_id])
    .then(({rows}) => {
        if (!rows.length){
            return Promise.reject({ status: 404, msg: "Not Found"})
        }
        return rows[0]
    })
}

exports.patchArticleComments2 = (article_id, inc_votes) => {
    return db
    .query(`UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`, [inc_votes, article_id])
    .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({status: 404, msg: "This comment id has not returned any updates"})
        }
        
        return rows[0]

    });
};

exports.deleteArticleComment3 = (comment_id) => {
    return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING*;`, [comment_id])
    .then((data) => {
        
        const deletedComment = data.rows[0];
        return deletedComment;
    })

}