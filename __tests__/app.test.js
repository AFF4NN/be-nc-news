const data = require("../db/data/test-data/index");
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");
const seed = require("../db/seeds/seed");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return connection.end;
});

describe("/api/topics", () => {
  it("GET /api/topics - should return an array of topic objects", () => {
    return request(app).get("/api/topics").expect(200);
  });

  it("200: should return an array", () => {
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
