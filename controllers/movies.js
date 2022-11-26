const Movie = require("../models/Movie");

exports.getMoviesHome = (req, res, next) => {
  const { genre } = req.query;

  Movie.getMovies((movies) => {
    res.render("home", {
      title: "Movies Manager",
      movies,
      genre,
    });
  });
};
