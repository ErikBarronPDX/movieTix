function Movie(movieName, movieRating, movieSynopsis) {
  this.movieName = movieName;
  this.movieRating = movieRating;
  this.movieSynopsis = movieSynopsis;
}

function MovieList() {
  this.movies = [];
  this.currentId = 0;
}

MovieList.prototype.addMovie = function(movie) {
  movie.id = this.assignId();
  this.movies.push(movie);
}

MovieList.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

function displayMovieList(movieListToDisplay) {
  var movieList = $("#movieList");
  var htmlForMovieList = "";
  movieListToDisplay.movies.forEach(function(movie) {
    htmlForMovieList += 
    "<div class='row individualMovies'>" + 
      "<div class='col-md-3'>" + movie.movieName + "</div>" + 
      "<div class='col-md-1'>" + movie.movieRating + "</div>" + 
      "<div class='col-md-8'>" + movie.movieSynopsis + "</div>" +
    "</div>"
  });
  movieList.html(htmlForMovieList);
};

function generateTimetableForm(inputMovieDatabase, numberOfTheaters) {
  var timetable = $("#timetableInput");
  var htmlForTimetable = "";
  var htmlForSelector = generateMovieSelector(inputMovieDatabase);
  var i = 1;
  while ( i <= numberOfTheaters) {
    htmlForTimetable += 
      "<div class='row'>" + 
        "<div class='col-md-12 theaterRoomRow'>" +
          "<p><strong>Theater " + i + "</strong></p>" +
          "<div class='row'>" +
            "<div class='col-md-3'><p>12:00pm</p><select id='" + i + "_1200'>" + htmlForSelector + "</select></div>" +
            "<div class='col-md-3'><p>3:00pm</p><select id='" + i + "_1500'>" + htmlForSelector + "</select></div>" +
            "<div class='col-md-3'><p>6:00pm</p><select id='" + i + "_1800'>" + htmlForSelector + "</select></div>" +
            "<div class='col-md-3'><p>9:00pm</p><select id='" + i + "_2100'>" + htmlForSelector + "</select></div>" +
          "</div>" +
        "</div>" +
     "</div>";
    i++;
  }
  timetable.html(htmlForTimetable);
}

function generateMovieSelector(inputMovieDatabase) {
  var htmlForSelector = "";
  inputMovieDatabase.movies.forEach(function(movie) {
    htmlForSelector += 
      "<option value='" + movie.id + "'>" + movie.movieName + "</option>";
  });

  return htmlForSelector;
};



//Front End
var movieDatabase = new MovieList();
var starterMovieKids = new Movie("That Children's Movie Part III", "G", "It's your kid's favorite character, but for the third time! We can't promise that we got rid of his annoying laugh. In fact, it's worse. It's better that we're up-front about this.")
var starterMovieBlockbuster = new Movie("Latest Superhero Blockbuster", "PG", "In a world where noxious chemicals actually cause superpowers instead of death, a man lies on his deathbed after contact with noxious chemicals. To say that there is a twist ending would actually be a spoiler in and of itself. So we won't.")
var starterMovieRomance = new Movie("Steamy Romance", "R", "An intense study about the birds and the bees. This movie has everything. Someone even drops trou!")
movieDatabase.addMovie(starterMovieKids);
movieDatabase.addMovie(starterMovieBlockbuster);
movieDatabase.addMovie(starterMovieRomance);




$(document).ready(function() {
  displayMovieList(movieDatabase);

  $("#submitEnterMovieButton").click(function() {
    var inputtedMovieName = $("input#inputMovieName").val();
    var inputtedMovieRating = $("select#inputMovieRating").val();
    var inputtedMovieSynopsis = $("textarea#inputMovieSynopsis").val();
    $("input#inputMovieName").val("");
    $("select#inputMovieRating").val("NA");
    $("textarea#inputMovieSynopsis").val("");
    var newMovie = new Movie(inputtedMovieName, inputtedMovieRating, inputtedMovieSynopsis)
    movieDatabase.addMovie(newMovie);
    displayMovieList(movieDatabase);
  });

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
    $("#inputMovieNameDisplay").slideUp();
    $("#toggleAddMovie").css("background-color", "");
    $("#doneEnteringMoviesButton").css("background-color", "")
    });

  $("#doneEnteringMoviesButton").click(function() {
    if ($("#inputMovieNameDisplay").is(":visible")){
      alert("Please submit or cancel adding a movie");
    } else {
      $("#inputMovieNameDisplay").hide();
      $("#toggleAddMovie").hide();
      $("#doneEnteringMoviesButton").hide();
      $("#howManyTheatersPanel").show();
    }
    console.log(movieDatabase);
  });

  $("#submitHowManyTheaterPanelButton").click(function() {
    var theaters = parseInt($("#inputHowManyTheaters").val());
    generateTimetableForm(movieDatabase, theaters);
    $("#howManyTheatersPanel").hide();
  });

  $("#toggleAddMovie").click(function() {

    if ($("#inputMovieNameDisplay").is(":visible")){
      alert("Please submit or cancel adding a movie");
    } else {
      $("#toggleAddMovie").css("background-color", "#007ce200");
      $("#doneEnteringMoviesButton").css("background-color", "#007ce200");
      $("#inputMovieNameDisplay").slideDown();
    }
  });

  $("#cancelEnteringMovieButton").click(function() {
    $("#inputMovieNameDisplay").slideUp();
    $("input#inputMovieName").val("");
    $("select#inputMovieRating").val("NA");
    $("textarea#inputMovieSynopsis").val("");
    $("#toggleAddMovie").css("background-color", "");
    $("#doneEnteringMoviesButton").css("background-color", "");
  });

});