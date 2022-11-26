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

exports.getAddMovie = (req, res, next) => {
  res.render("save-movie", {
    title: "Movies Manager",
    edit: false,
    cardTitle: "Add new movie",
    icon: "mdi:movie-open-plus",
  });
};

exports.getEditMovie = (req, res, next) => {
  const { ID } = req.params;

  Movie.getMovie(ID, (movie) => {
    res.render("save-movie", {
      title: "Movies Manager",
      edit: true,
      cardTitle: "Edit movie",
      icon: "mdi:movie-open-edit",
      movie,
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
