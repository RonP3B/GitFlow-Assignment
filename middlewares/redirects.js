exports.isAuthenticated = (req, res, next) => {
  if (req.session.isAuthenticated) {
    req.flash("msg", "You're already authenticated.");
    return res.redirect("/movies");
  }

  next();
};

exports.isUnauthorized = (req, res, next) => {
  if (!req.session.isAuthenticated) {
    req.flash("msg", "You need to authenticate first.");
    return res.redirect("/");
  }

  next();
};