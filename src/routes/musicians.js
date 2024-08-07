const { Router } = require("express");
const { Musician } = require("../../models/index");

const router = Router();

router.get("/", async (req, res) => {
  const allMusicians = await Musician.findAll();
  res.json(allMusicians);
});

router.get("/:id", async (req, res) => {
  const musicianId = req.params.id;
  const currentMusician = await Musician.findByPk(musicianId);

  if (!currentMusician) {
    res.status(404).send({ error: "Musician not found." });
    return;
  }

  res.json(currentMusician);
});

router.post("/", async (req, res) => {
  const newMusicianObject = req.body;
  const createdNewMusician = await Musician.create(newMusicianObject);
  res.status(201).json(createdNewMusician);
});

router.put("/:id", async (req, res) => {
  const currentMusicianId = req.params.id;
  const newMusicianObject = req.body;

  const createdNewMusician = await Musician.update(newMusicianObject, {
    where: { id: currentMusicianId },
  });
  res.json(createdNewMusician);
});

router.delete("/:id", async (req, res) => {
  const currentMusicianId = req.params.id;

  const currentMusician = await Musician.findByPk(currentMusicianId);

  await currentMusician.destroy();

  res.status(204).send();
});

module.exports = router;
