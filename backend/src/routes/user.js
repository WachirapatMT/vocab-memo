const router = require("express").Router();
const middleware = require("../middlewares/authentication");
const controller = require("../controllers");

router.get("/", middleware.authenticateUser, controller.User.getUserInfo);
router.post("/login", controller.User.login);
router.post("/", controller.User.createUser);

module.exports = router