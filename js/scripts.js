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
  });
  movieList.html(htmlForMovieList);
};

function generateTimetableForm(inputMovieDatabase, numberOfTheaters) {
  var timetable = $("#timetableInput");
  var htmlForTimetable = "";
  var i = 1;
  while ( i <= numberOfTheaters) {
    htmlForTimetable += 
    // "<div class='row'>" +
      "<p><strong>Theater " + i + "</strong></p>" +
      "<div class='row'>" +
        "<div class='col-md-3'>" + 
          "<p>12:00pm</p><br>" + 
          + "<select>" + generateMovieSelector(inputMovieDatabase)  +
          "</select>" +
        "</div>" +
        "<div class='col-md-3'>" + "3:00pm" + "</div>" +
        "<div class='col-md-3'>" + "6:00pm" + "</div>" +
        "<div class='col-md-3'>" + "9:00pm" + "</div>" +
      "</div>";
    // "</div>";
    i++;
  }
  timetable.html(htmlForTimetable);
}

function generateMovieSelector(inputMovieDatabase) {
  var htmlForSelector = "";
  var localIndex = 0;
  inputMovieDatabase.movies.forEach(function(movie) {
    htmlForSelector += 
      "<option value='" + localIndex + "'>" + movie.movieName + "</option>";
  });

  return htmlForSelector;
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
    $("#movieListDisplay").show();
    });

  $("#doneEnteringMoviesButton").click(function() {
    $("#inputMovieNameDisplay").hide();
    $("#howManyTheatersPanel").show();
  });

  $("#submitHowManyTheaterPanelButton").click(function() {
    var theaters = parseInt($("#inputHowManyTheaters").val());
    generateTimetableForm(movieDatabase, theaters);
  });

});