function Movie(movieName, movieRating, movieSynopsis) {
  this.movieName = movieName;
  this.movieRating = movieRating;
  this.movieSynopsis = movieSynopsis;
}

function MovieList() {
  this.movies = [];
}

MovieList.prototype.addMovie = function(movie) {
  this.movies.push(movie);
}

function displayMovieList(movieListToDisplay) {
  var movieList = $("#movieList");
  var htmlForMovieList = "";
  movieListToDisplay.movies.forEach(function(movie) {
    htmlForMovieList += 
    "<div class='row'>" + 
      "<div class='col-md-3'>" + movie.movieName + "</div>" + 
      "<div class='col-md-3'>" + movie.movieRating + "</div>" + 
      "<div class='col-md-6'>" + movie.movieSynopsis + "</div>" +
    "</div>"
    
    
    // "<li><p><strong>" + movie.movieName + "</strong></p><br>" + "<p> Rated: " + movie.movieRating + "</p><br>" + "<p> Synopsis: " + movie.movieSynopsis + "</p></li>"
  });
  movieList.html(htmlForMovieList);
};

//Front End
var movieDatabase = new MovieList();

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

    movieDatabase.addMovie(newMovie);

    displayMovieList(movieDatabase);

  })
})