const express = require("express");
const router = express.Router();
const requireAuth = require('./middleware/requireAuth')
const usersController = require("./controllers/usersController");
//post Node
router.route("/signup").post(usersController.signup);

router.route("/login").post(usersController.login);
router.route("/logout").get(usersController.logout);
router.route("/check-auth").get(requireAuth, usersController.checkAuth);
module.exports = router;
