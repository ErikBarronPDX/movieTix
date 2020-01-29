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
      "<div class='col-md-3'><span class='smallScreen'><strong>Name: </strong></span>" + movie.movieName + "</div>" + 
      "<div class='col-md-1'><span class='smallScreen'><strong>Rating: </strong></span>" + movie.movieRating + "</div>" + 
      "<div class='col-md-8'><span class='smallScreen'><strong>Synopsis: </strong></span>" + movie.movieSynopsis + "</div>" +
    "</div>"
  });
  movieList.html(htmlForMovieList);
};

function generateTimetableForm(inputMovieDatabase, numberOfTheaters) {
  var timetable = $("#editScheduleInput");
  var htmlForTimetable = "";
  var htmlForSelector = generateMovieSelector(inputMovieDatabase);
  var i = 1;
  while ( i <= numberOfTheaters) {
    htmlForTimetable += 
      "<div class='row'>" + 
        "<div class='col-md-12 contentColumn'>" +
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
var starterMovieKids = new Movie("That Children's Movie Part III", "G", "It's your kid's favorite character, but for the third time! The plot has only thinned out since the last installment and there is this new annoying character that gets introduced. You probably won't enjoy this but your kid might. It's better that we're up-front about this.")
var starterMovieBlockbuster = new Movie("Latest Superhero Blockbuster", "PG-13", "In a world where contact with noxious chemicals cause superpowers instead of death, a man lies on his deathbed after contact with noxious chemicals. To say that there is a twist ending would actually be a spoiler. So we won't.")
var starterMovieRomance = new Movie("Steamy Romance", "R", "An intense study about the birds and the bees. You'd better leave your kids with a sitter for this one. Unless you plan on having to explain a few concepts afterwards.")
movieDatabase.addMovie(starterMovieKids);
movieDatabase.addMovie(starterMovieBlockbuster);
movieDatabase.addMovie(starterMovieRomance);




$(document).ready(function() {
  displayMovieList(movieDatabase);

  $("#buttonAddMovie").click(function() {

    if ($("#newMovieDisplay").is(":visible")){
      alert("Please submit or cancel adding a movie");
    } else {
      $("#buttonAddMovie").css("background-color", "#007ce200");
      $("#buttonFinishMovieList").css("background-color", "#007ce200");
      $("#newMovieDisplay").slideDown();
    }
  });

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

  $("#buttonSubmitMovie").click(function() {
    var inputtedMovieName = $("input#inputMovieName").val();
    var inputtedMovieRating = $("select#inputMovieRating").val();
    var inputtedMovieSynopsis = $("textarea#inputMovieSynopsis").val();

    if (!inputtedMovieName){
      alert("Enter Movie Name");
    } else if (!inputtedMovieRating) {
      alert("Select Movie Rating");
    } else if (!inputtedMovieSynopsis) {
      alert("Enter Movie Synopsis");
    } else {
      $("input#inputMovieName").val("");
      $("select#inputMovieRating").val("NA");
      $("textarea#inputMovieSynopsis").val("");
      var newMovie = new Movie(inputtedMovieName, inputtedMovieRating, inputtedMovieSynopsis)
      movieDatabase.addMovie(newMovie);
      displayMovieList(movieDatabase);
      $("#newMovieDisplay").slideUp();
      $("#buttonAddMovie").css("background-color", "");
      $("#buttonFinishMovieList").css("background-color", "");
    }
  });

  $("#buttonFinishMovieList").click(function() {
    if ($("#newMovieDisplay").is(":visible")){
      alert("Please submit or cancel adding a movie");
    } else {
      $("#newMovieDisplay").hide();
      $("#buttonAddMovie").hide();
      $("#buttonFinishMovieList").hide();
      $("#screenRoomDisplay").show();
    }
    console.log(movieDatabase);
  });

  $("#buttonSubmitScreenRoom").click(function() {
    var theaters = parseInt($("#inputScreenRoom").val());
    generateTimetableForm(movieDatabase, theaters);
    $("#screenRoomDisplay").hide();
    $("#editScheduleDisplay").show();
  });



});