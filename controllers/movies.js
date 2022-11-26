exports.getMoviesHome = (req, res, next) => {
  res.render("home", {
    title: "Movies Manager",
  });
};
