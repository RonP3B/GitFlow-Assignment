const crypto = require("crypto");

const {
  getAllMovies,
  writeFileAsJSON,
} = require("../helpers/general/fileManagement");

module.exports = class Movie {
  constructor(name, description, genre, status, id = crypto.randomUUID()) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.genre = genre;
    this.status = status;
  }

  saveMovie() {
    getAllMovies((movies) => {
      movies.push(this);
      writeFileAsJSON(movies);
    });
  }

  editMovie() {
    getAllMovies((movies) => {
      const movieIdx = movies.findIndex((movie) => movie.id === this.id);
      movies[movieIdx] = this;
      writeFileAsJSON(movies);
    });
  }

  toString() {
    return `{id:${this.id},name:${this.name},description:${this.description},genre:${this.status}}`;
  }

  static getMovies(callBack) {
    getAllMovies(callBack);
  }

  static getMovie(id, callBack) {
    getAllMovies((movies) => {
      const movie = movies.find((movie) => movie.id === id);
      callBack(movie);
    });
  }

  static deleteMovie(id) {
    getAllMovies((movies) => {
      const newMovieList = movies.filter((movie) => movie.id !== id);
      writeFileAsJSON(newMovieList);
    });
  }
};
