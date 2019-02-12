// DECLARE VARIABLES

let score = 0;


// array of names of actors
let actors = [];

// array of movies selected actor is in
let movies = [];

let posterSources = [];

let gameStatus = 'start';




// *************************************************************************************************************************
//              EVENT HANDLERS                           EVENT HANDLERS                           EVENT HANDLERS
// *************************************************************************************************************************

// ***********************************************************
//                   ON KEY UP FUNCTION
// ***********************************************************
$(document).on('keyup', function () {


})
// ***********************************************************
///  ^^^^^^^^^^^^^^^^^ ON KEY UP FUNCTION ^^^^^^^^^^^^^^^^^^^
// ***********************************************************


// ***********************************************************
//                   START BUTTON FUNCTION
// ***********************************************************

//********************************************
//            AJAX CALL ACTORS

var key = 'a2263fe97d8f900e28e6323428ce7aa9'

// SEARCH ACTORS URL
var queryURL = 'https://api.themoviedb.org/3/person/popular?page=1' +
    '&language=en-US&api_key=' + key

// SEARCH ACTORS AJAX CALL
$.ajax({
    url: queryURL,
    method: 'GET'
}).then(function (response) {
    // loop through response to return array of actor names
    for (i in response.results) {
        actors.push(response.results[i].name)
    }
    console.log(actors)
    // pick an actor randomly from actors array
    let currentActor = actors[Math.floor(Math.random() * actors.length)];

    //***************************************
    //            AJAX CALL MOVIES

    // SEARCH MOVIES URL
    queryURL = 'https://api.themoviedb.org/3/search/person?api_key=' + key +
        '&language=en-US&query=' + currentActor.replace(/ /g, "%20").toLowerCase() + '&page=1&include_adult=false'

       

    // SEARCH MOVIES AJAX CALL
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response.results[0].known_for)
        // loop through popular movies to get 3 movie poster source URL's
        for (i in response.results[0].known_for){

        //img tag, src from below, append to the div with the demo container class
        var imgURL = response.Poster;
        // Creating an image tag, element to hold the image
        var img = $("<img>").attr("src", 'https://image.tmdb.org/t/p/w1280/' + response.results[0].known_for[i].poster_path);
        //append to the div
        $('#moviecontainer').append(img);
        
        posterSources.push('https://image.tmdb.org/t/p/w1280/' + response.results[0].known_for[i].poster_path)
            
    }
    console.log(posterSources)


/****** Started writing an if/else if statement here

    if (response.pagination.total_count >= 1) {
            .push('https://image.tmdb.org/t/p/w1280/' + response.results[0].known_for[i].poster_path);
            posterSources.push(); }
        else if (response.pagination.total_count === 0) {
            $("#entry").html(" Sorry, there were no results for this.  Please try again."); }
*/


//This is the div that holds the posters
//moviecontainer
var block_to_insert ;
var container_block ;
 
block_to_insert = document.createElement( 'div' );
block_to_insert.innerHTML = '' ;
container_block = document.getElementById( 'moviecontainer' );
container_block.appendChild( block_to_insert );

});





  





    //LIST MOVIES FROM AJAX IN HTML CONTAINER



     /*$.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      // Create a new table row element
      var tRow = $("<tr>");

      // Methods run on jQuery selectors return the selector they we run on
      // This is why we can create and save a reference to a td in the same statement we update its text
      var titleTd = $("<td>").text(response.Title);
      var yearTd = $("<td>").text(response.Year);
      var actorsTd = $("<td>").text(response.Actors);
        
      // Append the newly created table data to the table row
      tRow.append(titleTd, yearTd, actorsTd);
      // Append the table row to the table body
      $("tbody").append(tRow);
    });*/







    //   ^^^^^^   AJAX CALL MOVIES ^^^^^^
    //***************************************
})
//     ^^^^^^   AJAX CALL ACTORS ^^^^^^
//***********************************************

// ***********************************************************
//  ^^^^^^^^^^^^^^^^ START BUTTON FUNCTION ^^^^^^^^^^^^^^^^^^
// ***********************************************************


// ***********************************************************
//                  GIVE HINT BUTTON FUNCTION
// ***********************************************************
$('#hint').on('click', function () {



})
// ***********************************************************
//  ^^^^^^^^^^^^^^ GIVE HINT BUTTON FUNCTION ^^^^^^^^^^^^^^^^
// ***********************************************************

// ***********************************************************
//                  ANOTHER FUNCTION
// ***********************************************************


// ***********************************************************
//  ^^^^^^^^^^^^^^ ANOTHER FUNCTION ^^^^^^^^^^^^^^^^
// ***********************************************************




// *************************************************************************************************************************
// ^^^^^^^^^^^ EVENT HANDLERS ^^^^^^^^^^^^^^^^^^^^^^ EVENT HANDLERS ^^^^^^^^^^^^^^^^^^^^^^^^^^ EVENT HANDLERS ^^^^^^^^^^^^^
// *************************************************************************************************************************
