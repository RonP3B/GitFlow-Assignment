const locals = (req, res, next) => {
  const messages = req.flash("msg");

  res.locals.csrfToken = req.csrfToken();
  res.locals.messages = messages;
  res.locals.hasMessages = messages.length > 0;
  res.locals.isAuthenticated = req.session.isAuthenticated;

  next();
};

module.exports = locals;