"use strict";

require("dotenv").config();
const express = require("express");
const moviesRouter = require("./routes/movies");
const authRouter = require("./routes/authentication");
const path = require("path");
const { engine } = require("express-handlebars");
const moviesController = require("./controllers/movies");
const databaseObj = require("./util/databaseObj");
const Movie = require("./models/Movie");
const User = require("./models/User");
const session = require("express-session");
const flash = require("connect-flash");
const locals = require("./middlewares/locals");
const csrf = require("csurf");
const csrfProtection = csrf();

const app = express();
const port = process.env.PORT || 5000;

app.engine(
  "hbs",
  engine({
    layoutsDir: "views/layouts",
    defaultLayout: "mainLayout",
    extname: "hbs",
    helpers: {
      equal: (a, b) => a === b,
      json: (obj) => JSON.stringify(obj)
    },
  })
);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
  secret: "mysecret",
  resave: true,
  saveUninitialized: false,
}));
app.use(flash());
app.use(csrfProtection);
app.use(locals);
app.use("/", authRouter);
app.use("/movies", moviesRouter);
app.use(moviesController.getNotFound);

databaseObj
  .sync()
  .then((res) => app.listen(port, () => console.log(`Listening on ${port}`)))
  .catch((err) => {
    console.log(err);
  });
