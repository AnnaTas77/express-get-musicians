const { Router } = require("express");
const { Musician } = require("../../models/index");
const { check, validationResult } = require("express-validator");

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

//checks that the "name" field in the request.body is not empty and doesn’t only contain whitespace.
router.post(
  "/",
  [
    check("name").notEmpty().trim(),
    check("name").isLength({ min: 2, max: 20 }),
    check("instrument").notEmpty().trim(),
    check("instrument").isLength({ min: 2, max: 20 }),
  ],
  async (req, res) => {
    //validate the results of your checks and store them in a variable named errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ error: errors.array() });
      return;
    }

    const newMusicianObject = req.body;
    const createdNewMusician = await Musician.create(newMusicianObject);
    res.status(201).json(createdNewMusician);
  }
);

router.put(
  "/:id",
  [
    check("name").notEmpty().trim(),
    check("name").isLength({ min: 2, max: 20 }),
    check("instrument").notEmpty().trim(),
    check("instrument").isLength({ min: 2, max: 20 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).send({ error: errors.array() });
      return;
    }

    const currentMusicianId = req.params.id;
    const newMusicianObject = req.body;
    const createdNewMusician = await Musician.update(newMusicianObject, {
      where: { id: currentMusicianId },
    });
    res.status(201).json(createdNewMusician);
  }
);

router.delete("/:id", async (req, res) => {
  const currentMusicianId = req.params.id;

  const currentMusician = await Musician.findByPk(currentMusicianId);

  await currentMusician.destroy();

  res.status(204).send();
});

module.exports = router;
