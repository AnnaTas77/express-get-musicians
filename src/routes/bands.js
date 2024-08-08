const { Router } = require("express");
const { Band } = require("../../models/index");

const router = Router();

router.get("/", async (req, res) => {
  const allBands = await Band.findAll();
  res.json(allBands);
});

router.get("/:id", async (req, res) => {
  const bandId = req.params.id;
  const currentBand = await Band.findByPk(bandId);

  // include the Musician(s) that are part of that particular Band

  res.status(200).send(currentBand);
});

module.exports = router;
