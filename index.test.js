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

  test("testing if the GET request is successful", async () => {
    // Sends request to `/musicians` endpoint
    const response = await request(app).get("/musicians");
    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(response.status).toBeLessThan(300);
  });

  test("testing the response data", async () => {
    const response = await request(app).get("/musicians");
    const musiciansData = JSON.parse(response.text);

    expect(Array.isArray(musiciansData)).toBe(true);

    // the expect statement below expects an array of only objects and will check all of them
    expect(musiciansData).toEqual(
      musiciansData.map(() =>
        expect.objectContaining({
          name: expect.any(String),
          instrument: expect.any(String),
        })
      )
    );

    // the expect statement below expects an array that can contain any data, but will check just the objects

    // expect(responseData).toEqual(
    //   expect.arrayContaining(
    //     responseData.map((obj) => {
    //       return expect.objectContaining({
    //         id: obj.id,
    //         name: obj.name,
    //         instrument: obj.instrument,
    //         bandId: obj.bandId,
    //       });
    //     })
    //   )
    // );
  });
});
