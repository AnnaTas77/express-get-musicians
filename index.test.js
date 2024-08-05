// install dependencies
const { execSync } = require("child_process");
execSync("npm install");
execSync("npm run seed");
const { describe, it, expect, beforeAll, afterEach } = require("@jest/globals");

const request = require("supertest");
const { db } = require("./db/connection");
const { Musician } = require("./models/index");
const app = require("./src/app");
const seedMusician = require("./seedData");

describe("GET /musicians endpoint", () => {
  // Write your tests here

  test("testing if the GET request is successful and the status code is 200", async () => {
    // Sends request to `/musicians` endpoint
    const response = await request(app).get("/musicians");
    expect(response.statusCode).toBe(200);
  });

  test("testing the response data", async () => {
    const response = await request(app).get("/musicians");
    const responseData = JSON.parse(response.text);

    expect(responseData.length).toBe(3);

    expect(responseData).toEqual(
      expect.arrayContaining(
        responseData.map((obj) => {
          expect.objectContaining({
            id: obj.id,
            name: obj.name,
            instrument: obj.instrument,
            bandId: obj.bandId,
          });
        })
      )
    );
  });
});
