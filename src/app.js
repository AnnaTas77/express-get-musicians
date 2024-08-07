const express = require("express");
const app = express();
const { Band } = require("../models/index");
const { db } = require("../db/connection");
const musiciansRouter = require("./routes/musicians");

app.use(express.json());
app.use(express.urlencoded());

app.use("/musicians", musiciansRouter);

app.get("/bands", async (req, res) => {
  const allBands = await Band.findAll();
  res.json(allBands);
});

module.exports = app;
