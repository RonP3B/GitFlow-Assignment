const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", { icon: "material-symbols:lock" });
}

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", { icon: "material-symbols:lock" });
}

exports.getLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) console.log(`Couldn't destroy session: ${err}`);
    else res.redirect("/");
  });
};

exports.postLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) return res.redirect("/");

    const user = await User.findOne({ where: { username: username.toLowerCase() } });

    if (!user) {
      req.flash("msg", "Invalid username.");
      return res.redirect("/");
    }

    const isValidPass = await bcrypt.compare(password, user.password);

    if (!isValidPass) {
      req.flash("msg", "incorrect password.");
      return res.redirect("/");
    }

    req.session.isAuthenticated = true;
    req.session.user = user;

    req.session.save((err) => {
      if (err) console.log(`session save error: ${err}`);
      req.flash("msg", `Welcome ${user.username}.`);
      return res.redirect("/movies");
    });
  } catch (error) {
    res.sendStatus(500);
    console.log(`\n${error}\n`);
  }
}

exports.postSignup = async (req, res, next) => {
  try {
    const { username, password, confirmPassword } = req.body;

    if (!username || !password || !confirmPassword) {
      return res.redirect("/sign-up");
    }

    if (password.length < 6) {
      req.flash("msg", "The password must contain more than 5 characters.");
      return res.redirect("/sign-up");
    }

    if (password !== confirmPassword) {
      req.flash("msg", "The passwords do not match.");
      return res.redirect("/sign-up");
    }

    const objUser = await User.findOne({
      where: { username: username.toLowerCase() }
    });

    if (objUser) {
      req.flash("msg", "That username already exists, try another one.");
      return res.redirect("/sign-up");
    }

    const securedPassword = await bcrypt.hash(password, 12);

    await User.create({
      id: crypto.randomUUID(),
      username: username.toLowerCase(),
      password: securedPassword
    });

    req.flash("msg", "Account created successfully.");
    res.redirect("/");
  } catch (error) {
    res.sendStatus(500);
    console.log(`\n${error}\n`);
  }
}