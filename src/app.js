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
  res.json(currentMusician);
});



module.exports = app;
