const router = require("express").Router();
const middleware = require("../middlewares/authentication");
const controller = require("../controllers");

router.use("/", middleware.authenticateUser);
router.get("/", controller.WordSet.getWordSets);
router.get("/:id", controller.WordSet.getWordSetById);
router.post("/", controller.WordSet.createWordSet);
router.patch("/:id", controller.WordSet.updateWordSetById);
router.delete("/:id", controller.WordSet.deleteWordSetById);
router.post("/:id/vocabulary", controller.WordSet.addVocabulary);
router.patch(
  "/:id/vocabulary/:vocabularyId",
  controller.WordSet.updateVocabulary,
);
router.delete(
  "/:id/vocabulary/:vocabularyId",
  controller.WordSet.deleteVocabulary,
);

module.exports = router;
