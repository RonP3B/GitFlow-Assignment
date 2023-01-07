const express = require("express");
const moviesController = require("../controllers/movies");
const redirects = require("../middlewares/redirects");

const router = express.Router();

router.get("", redirects.isUnauthorized, moviesController.getMoviesHome);
router.get("/add-movie", redirects.isUnauthorized, moviesController.getAddMovie);
router.get("/edit-movie/:ID", redirects.isUnauthorized, moviesController.getEditMovie);
router.get("/about", moviesController.getAbout);
router.post("/add-movie", redirects.isUnauthorized, moviesController.postAddMovie);
router.post("/edit-movie", redirects.isUnauthorized, moviesController.postEditMovie);
router.post("/delete-movie/:ID", redirects.isUnauthorized, moviesController.postDeleteMovie);

module.exports = router;
