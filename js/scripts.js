function Movie(movieName, movieRating) {
  this.movieName = movieName;
  this.movieRating = movieRating;
}

$(document).ready(function() {


  $("form#showtimeForm").submit(function(event) {
    event.preventDefault();
    var inputtedMovieName12 = $("input#inputMovieName12").val();
    var inputtedMovieRating12 = $("select#selectMovieRating12").val();
    var newMovie12 = new Movie (inputtedMovieName12, inputtedMovieRating12);


    var inputtedMovieName15 = $("input#inputMovieName15").val();
    var inputtedMovieRating15 = $("select#selectMovieRating15").val();
    var newMovie15 = new Movie (inputtedMovieName15, inputtedMovieRating15);

    var inputtedMovieName18 = $("input#inputMovieName18").val();
    var inputtedMovieRating18 = $("select#selectMovieRating18").val();
    var newMovie18 = new Movie (inputtedMovieName18, inputtedMovieRating18);

    var inputtedMovieName21 = $("input#inputMovieName21").val();
    var inputtedMovieRating21 = $("select#selectMovieRating21").val();
    var newMovie21 = new Movie (inputtedMovieName21, inputtedMovieRating21);

    console.log(newMovie12);
    console.log(newMovie15);
    console.log(newMovie18);
    console.log(newMovie21);

    $("#displayMovieName12").text(newMovie12.movieName + "  Rated " + newMovie12.movieRating);


  })

})