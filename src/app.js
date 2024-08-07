const express = require("express");
const app = express();
const { Musician, Band } = require("../models/index");
const { db } = require("../db/connection");

const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

app.get("/bands", async (req, res) => {
  const allBands = await Band.findAll();
  res.json(allBands);
});

app.get("/musicians", async (req, res) => {
  const allMusicians = await Musician.findAll();
  res.json(allMusicians);
});

app.get("/musicians/:id", async (req, res) => {
  const musicianId = req.params.id;
  const currentMusician = await Musician.findByPk(musicianId);

  if (!currentMusician) {
    res.status(404).send({ error: "Musician not found." });
    return;
  }

  res.json(currentMusician);
});

app.post("/musicians", async (req, res) => {
  const newMusicianObject = req.body;
  const createdNewMusician = await Musician.create(newMusicianObject);
  res.status(201).json(createdNewMusician);
});

app.put("/musicians/:id", async (req, res) => {
  const currentMusicianId = req.params.id;
  const newMusicianObject = req.body;

  const createdNewMusician = await Musician.update(newMusicianObject, {
    where: { id: currentMusicianId },
  });
  res.json(createdNewMusician);
});

app.delete("/musicians/:id", async (req, res) => {
  const currentMusicianId = req.params.id;

  const currentMusician = await Musician.findByPk(currentMusicianId);

  await currentMusician.destroy();

  res.status(204).send();
});

module.exports = app;
