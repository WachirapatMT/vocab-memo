const router = require("express").Router();
const middleware = require("../middlewares/authentication");
const controller = require("../controllers/user.controller");

router.get("/", middleware.authenticateUser, controller.getUserInfo);

router.post("/", controller.createUser);
router.post("/login", controller.login);

module.exports = router;
