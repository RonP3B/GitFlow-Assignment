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

exports.getAbout = (req, res, next) => {
  res.render("about", {
    title: "Movies Manager",
  });
};

exports.getNotFound = (req, res, next) => {
  res.status(404).render("notFound", { title: "Movies Manager" });
};
