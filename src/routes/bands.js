const { Router } = require("express");
const { Band } = require("../../models/index");

const router = Router();

router.get("/", async (req, res) => {
  const allBands = await Band.findAll();
  res.json(allBands);
});

module.exports = router;
