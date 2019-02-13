@ -1,24 +1,112 @@
// **********************************
//          EVENT HANDLERS
//***********************************
// DECLARE VARIABLES

let score = 0;


// array of names of actors
let actors = [];

// array of movies selected actor is in
let movies = [];

let gameStatus = 'start';




// *************************************************************************************************************************
//              EVENT HANDLERS                           EVENT HANDLERS                           EVENT HANDLERS
// *************************************************************************************************************************

// ***********************************************************
//                   ON KEY UP FUNCTION
// ***********************************************************
$(document).on('keyup', function(){


})
// ***********************************************************
///  ^^^^^^^^^^^^^^^^^ ON KEY UP FUNCTION ^^^^^^^^^^^^^^^^^^^
// ***********************************************************


// ***********************************************************
//                   START BUTTON FUNCTION
// ***********************************************************

//********************************************
//            AJAX CALL ACTORS

//***********************************
//          EVENT HANDLERS
//***********************************
var key = 'a2263fe97d8f900e28e6323428ce7aa9'

var queryURL = 'https://api.themoviedb.org/3/movie/550?api_key=' + key
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

'https://api.themoviedb.org/3/discover/movie?page=1&include_video=false&include_adult=false&sort_by=popularity.desc&language=en-US&api_key=a2263fe97d8f900e28e6323428ce7aa9' 
// format currentActor for movies URL
currentActor = currentActor.replace(/ /g,"%20").toLowerCase();
console.log(currentActor)

// SEARCH MOVIES URL
queryURL = 'https://api.themoviedb.org/3/search/person?api_key='+ key +'&language=en-US&query=' + currentActor + '&page=1&include_adult=false'

// SEARCH MOVIES AJAX CALL
$.ajax({
    url: queryURL,
    method: 'GET'
}).then(function(response){
    console.log(response)
}).then(function (response) {
console.log(response.results[0].known_for)
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
    $('#hint').on('click', function(){



    })
// ***********************************************************
//  ^^^^^^^^^^^^^^ GIVE HINT BUTTON FUNCTION ^^^^^^^^^^^^^^^^
// ***********************************************************







// *************************************************************************************************************************
// ^^^^^^^^^^^ EVENT HANDLERS ^^^^^^^^^^^^^^^^^^^^^^ EVENT HANDLERS ^^^^^^^^^^^^^^^^^^^^^^^^^^ EVENT HANDLERS ^^^^^^^^^^^^^
// *************************************************************************************************************************




