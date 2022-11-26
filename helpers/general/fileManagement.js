const path = require("path");
const fs = require("fs");

const rootPath = path.dirname(require.main.filename);
const moviesPath = path.join(rootPath, "data", "movies.json");

const getAllMovies = (callBack) => {
  fs.readFile(moviesPath, (err, res) =>
    err ? callBack([]) : callBack(JSON.parse(res))
  );
};

const writeFileAsJSON = (file) => {
  fs.writeFile(moviesPath, JSON.stringify(file), function (err) {
    if (err) throw err;
  });
};

module.exports = { getAllMovies, writeFileAsJSON };
