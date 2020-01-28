function Movie(movieName, movieRating, movieSynopsis) {
  this.movieName = movieName;
  this.movieRating = movieRating;
  this.movieSynopsis = movieSynopsis;
}

$(document).ready(function() {
  $("form#inputForm").submit(function(event) {
    event.preventDefault();

    var inputtedMovieName = $("input#inputMovieName").val();
    var inputtedMovieRating = $("select#inputMovieRating").val();
    var inputtedMovieSynopsis = $("textarea#inputMovieSynopsis").val();

    $("input#inputMovieName").val("");
    $("select#inputMovieRating").val("NA");
    $("textarea#inputMovieSynopsis").val("");

    var newMovie = new Movie(inputtedMovieName, inputtedMovieRating, inputtedMovieSynopsis)

    console.log(newMovie);

  })
})