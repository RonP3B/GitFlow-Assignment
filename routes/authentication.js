const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const redirects = require("../middlewares/redirects");

router.get("", redirects.isAuthenticated, authController.getLogin);
router.get("/sign-up", redirects.isAuthenticated, authController.getSignup);
router.get("/log-out", authController.getLogout);
router.post("/log-in", authController.postLogin);
router.post("/sign-up", authController.postSignup);

module.exports = router;