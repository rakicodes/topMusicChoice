const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const homeController = require("../controllers/home")
const authController = require("../controllers/auth")

router.get("/", homeController.getHome);
router.get("/profile", ensureAuth, homeController.getProfile);
router.get("/top", homeController.getTop);

router.get("/login", ensureGuest, authController.getLogin);
router.post("/login", authController.postLogin);

router.get("/logout", authController.logout);

router.get("/signup", ensureGuest, authController.getSignup);
router.post("/signup", authController.postSignup);


module.exports = router;