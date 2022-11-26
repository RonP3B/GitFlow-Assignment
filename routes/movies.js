const express = require("express");
const moviesController = require("../controllers/movies");

const router = express.Router();

router.get("", moviesController.getMoviesHome);
router.get("/about", moviesController.getAbout);

module.exports = router;
