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
            posterSources.push('https://image.tmdb.org/t/p/w1280/' + response.results[0].known_for[i].poster_path)
            
    }
    console.log(posterSources)
})
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




