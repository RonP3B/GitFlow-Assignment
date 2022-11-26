const express = require("express");
const moviesController = require("../controllers/movies");

const router = express.Router();

router.get("", moviesController.getMoviesHome);

module.exports = router;
