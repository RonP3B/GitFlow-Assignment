const express = require("express");
const moviesController = require("../controllers/movies");

const router = express.Router();

router.get("", moviesController.getMoviesHome);
router.get("/add-movie", moviesController.getAddMovie);
router.get("/edit-movie/:ID", moviesController.getEditMovie);
router.get("/about", moviesController.getAbout);

module.exports = router;
