const data = require("../db/data/test-data/index");
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");
const seed = require("../db/seeds/seed");
const endPoints = require("../endpoints.json");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return connection.end();
});

describe("/api/topics", () => {
  it("GET /api/topics - should return an array of topic objects", () => {
    return request(app).get("/api/topics").expect(200);
  });

  it("should return an array", () => {
    return request(app)
      .get("/api/topics")
      .then((response) => {
        expect(Array.isArray(response.body.topics)).toBe(true);
        response.body.topics.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
});

describe("GET /api", () => {
  it("GET /api/topics - should return an array of topic objects", () => {
    return request(app).get("/api").expect(200);
  });

  it("includes all endpoints ", () => {
    return request(app)
      .get("/api")
      .then((response) => {
        expect(response.body).toEqual(endPoints);
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("responds with an article object containing the correct properties", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => {
        console.log(response.body);
        const { article } = response.body;
        expect(article).toEqual(
          expect.objectContaining({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            body: expect.any(String),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
          })
        );
      });
  });

  test("responds with an error when article_id does not exist", () => {
    return request(app)
      .get("/api/articles/999")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Article not found");
      });
  });
});

describe("/api/articles", () => {
  test("Test to check we are recieving an array of articles", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const { articles } = response.body;
        expect(Array.isArray(articles)).toBe(true);
        articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comment_count: expect.any(String) 
            })
          );
        });
        
      });
  });

test('should not have a property body', () => {
  return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const { articles } = response.body;
        articles.forEach((article) => {
          expect(article).not.toHaveProperty("body")
        });
        
      });
});
test('should have articles in decending order ', () => {
  return request(app)
  .get("/api/articles")
      .expect(200)
      .then((response) => {
        const { articles } = response.body;
        
        expect(new Date(articles[0].created_at) > new Date(articles[1].created_at)).toBe(true)
      });
});
});

describe('should give back comments most recently created  ', () => {

  test(' test to see we are recieving an array of comments', () => {
    return request(app)
    .get("/api/articles/1/comments")
    .expect(200)
    .then((response) => { const {comments} = response.body;
// console.log(response.body, "THIS IS response");
    expect(Array.isArray(comments)).toBe(true)
    

    })
  });

  test('should return 400 with bad request if article id is not valid', () => {
    return request(app)
    .get("/api/articles/AFFAN/comments")
    .expect(400)
    .then((response) => {expect(response.body.msg).toEqual("Bad Request")});
  
});

test('should return no comments when there are no comments against that article ID ', () => {
  return request(app)
  .get("/api/articles/2000/comments")
    .expect(200)
    .then((response) => {expect(response.body.msg).toEqual("No Comments")});
});
});

// describe('Add a comment for an article with a username and body ', () => {
//   return request(app)
//   .post("")
// });




