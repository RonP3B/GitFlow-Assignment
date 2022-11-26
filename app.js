"use strict";

const express = require("express");
const moviesRouter = require("./routes/movies");
const path = require("path");
const { engine } = require("express-handlebars");
const filterMoviesByGenre = require("./helpers/hbs/filterMoviesByGenre");

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
      filterMoviesByGenre,
      isAnEmptyArray: (arr) => arr.length === 0,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", moviesRouter);

app.listen(port, () => console.log(`Server running on port ${port}...`));
