const filterMovieByGenre = (movies, genre) => {
  if (!movies) return;
  if (genre) return movies.filter((movie) => movie.genre === genre);
  return movies;
};

module.exports = filterMovieByGenre;
