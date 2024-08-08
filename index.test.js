// install dependencies
const { execSync } = require("child_process");
execSync("npm install");
execSync("npm run seed");
const { describe, it, expect, beforeAll, afterEach } = require("@jest/globals");

const request = require("supertest");
const { db } = require("./db/connection");
const { Musician, Band } = require("./models/index");
const app = require("./src/app");
const seedMusician = require("./seedData");

describe("GET /bands endpoint", () => {
  test("testing if the GET request is successful", async () => {
    const response = await request(app).get("/bands");
    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(response.status).toBeLessThan(300);
  });

  test("testing the response data", async () => {
    const response = await request(app).get("/bands");
    const bandsData = JSON.parse(response.text);

    expect(Array.isArray(bandsData)).toBe(true);
    // the expect statement below expects an array of only objects and will check all of them
    expect(bandsData).toEqual(
      bandsData.map(() =>
        expect.objectContaining({
          name: expect.any(String),
          genre: expect.any(String),
        })
      )
    );
  });
});

describe("GET /bands/:id endpoint", () => {
  test("testing if the GET request is successful", async () => {
    const response = await request(app).get("/bands/1");
    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(response.status).toBeLessThan(300);
  });

  test("testing the response data", async () => {
    const response = await request(app).get("/bands/1");
    const bandsDataFromResponse = response.body;
    const bandsDataFromDB = (await Band.findByPk(1)).toJSON();

    expect(bandsDataFromResponse).toEqual(
      expect.objectContaining({
        id: bandsDataFromDB.id,
        name: bandsDataFromDB.name,
        genre: bandsDataFromDB.genre,
      })
    );
  });
});

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

describe("GET /musicians/:id", () => {
  test("testing if the GET request is successful", async () => {
    // Sends request to `/musicians/1` endpoint
    const response = await request(app).get("/musicians/1");
    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(response.status).toBeLessThan(300);
  });

  test("testing the response data", async () => {
    const response = await request(app).get("/musicians/1");
    const musicianById = JSON.parse(response.text);
    // console.log(musicianById);

    expect(typeof musicianById).toBe("object");

    expect(musicianById).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        instrument: expect.any(String),
      })
    );
  });
});

describe("POST /musicians", () => {
  test("testing if the POST request is successful", async () => {
    const newMusician = {
      name: "Lady Gaga",
      instrument: "Voice",
    };
    const response = await request(app).post("/musicians").send(newMusician);
    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(response.status).toBeLessThan(300);
  });

  test("testing the response data", async () => {
    const newMusician = {
      name: "Lady Gaga",
      instrument: "VocalistVoice",
    };
    const response = await request(app).post("/musicians").send(newMusician);
    const receivedNewMusician = JSON.parse(response.text);
    // console.log(receivedNewMusician);

    expect(typeof receivedNewMusician).toBe("object");

    expect(receivedNewMusician).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        instrument: expect.any(String),
      })
    );
  });
});

describe("PUT /musicians/:id", () => {
  test("testing if the PUT request is successful", async () => {
    const newMusician = {
      name: "Stevie Wonder",
      instrument: "Voice",
    };
    const response = await request(app).put("/musicians/1").send(newMusician);
    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(response.status).toBeLessThan(300);
  });

  test("testing the response data", async () => {
    const newMusician = {
      name: "Stevie Wonder",
      instrument: "Voice",
    };
    const response = await request(app).post("/musicians/1").send(newMusician);

    // console.log(response.body);
    const currentMusician = await Musician.findByPk(1);

    expect(currentMusician).toEqual(
      expect.objectContaining({ name: "Stevie Wonder", instrument: "Voice" })
    );
  });
});

describe("DELETE /musicians/:id", () => {
  test("testing if it's deleting (removing) a musician from the database based on the id in the route", async () => {
    const response = await request(app).delete("/musicians/2");

    // console.log(response.body);
    const currentMusician = await Musician.findByPk(2);

    expect(currentMusician).toBeNull();
  });
});
