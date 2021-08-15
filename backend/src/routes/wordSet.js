const router = require("express").Router();
const middleware = require("../middlewares/authentication");
const controller = require("../controllers/wordSet.controller");

router.use("/", middleware.authenticateUser);

router.get("/", controller.getWordSets);
router.get("/:id", controller.getWordSetById);

router.post("/", controller.createWordSet);
router.post("/:id/vocabulary", controller.addVocabulary);

router.patch("/:id", controller.updateWordSetById);
router.patch("/:id/vocabulary/:vocabularyId", controller.updateVocabulary);

router.delete("/:id", controller.deleteWordSetById);
router.delete("/:id/vocabulary/:vocabularyId", controller.deleteVocabulary);

module.exports = router;
