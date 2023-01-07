const Movie = require("../models/Movie");
const crypto = require("crypto");

exports.getMoviesHome = async (req, res, next) => {
  try {
    const { genre } = req.query;
    let moviesRes;

    if (!genre) {
      moviesRes = await Movie.findAll({
        where: { user_id: req.session.user.id }
      });
    } else {
      moviesRes = await Movie.findAll({
        where: { genre, user_id: req.session.user.id }
      });
    }

    const movies = moviesRes.map((movie) => movie.dataValues);

    res.render("home", { movies, genre });
  } catch (error) {
    res.sendStatus(500);
    console.log(`\n${error}\n`);
  }
};

exports.getAddMovie = (req, res, next) => {
  res.render("save-movie", {
    edit: false,
    cardTitle: "Add new movie",
    icon: "mdi:movie-open-plus",
  });
};

exports.getEditMovie = async (req, res, next) => {
  try {
    const id = req.params.ID;

    if (!id) return res.redirect("/movies");

    const movieRes = await Movie.findOne({
      where: { id, user_id: req.session.user.id }
    });

    if (!movieRes) return res.redirect("/movies");

    res.render("save-movie", {
      edit: true,
      cardTitle: "Edit movie",
      icon: "mdi:movie-open-edit",
      movie: movieRes.dataValues,
    });
  } catch (error) {
    res.sendStatus(500);
    console.log(`\n${error}\n`);
  }
};

exports.getAbout = (req, res, next) => {
  res.render("about");
};

exports.getNotFound = (req, res, next) => {
  res.status(404).render("notFound");
};

exports.postAddMovie = async (req, res, next) => {
  try {
    const { name, description, genre, } = req.body;

    if (!name || !description || !genre) {
      return res.redirect("/movies/add-movie");
    }

    await Movie.create({
      id: crypto.randomUUID(),
      user_id: req.session.user.id,
      name,
      description,
      genre,
    });

    res.render("form-success", { edited: false });
  } catch (error) {
    res.sendStatus(500);
    console.log(`\n${error}\n`);
  }
};

exports.postEditMovie = async (req, res, next) => {
  try {
    const { name, description, genre, status, ID } = req.body;

    if (!name || !description || !genre || !status || !ID) {
      return res.redirect("edit-movie")
    }

    await Movie.update(
      { name, description, genre, status },
      { where: { id: ID, user_id: req.session.user.id } }
    );

    res.render("form-success", { edited: true, ID });
  } catch (error) {
    res.sendStatus(500);
    console.log(`\n${error}\n`);
  }
};

exports.postDeleteMovie = async (req, res, next) => {
  try {
    const id = req.body.ID;

    if (id) {
      await Movie.destroy({ where: { id, user_id: req.session.user.id } });
      req.flash("msg", "Movie deleted successfully.");
    }

    res.redirect("/movies");
  } catch (error) {
    res.sendStatus(500);
    console.log(`\n${error}\n`);
  }
};
