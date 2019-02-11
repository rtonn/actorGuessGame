
// DECLARE VARIABLES
let guessesLeft = 10;
let score = 0;
let wins = 0;
let losses = 0;

// array of names of actors
let actors = [];

// array of movies selected actor is in
let movies = [];

let posterSources = [];

let gameStatus = 'start';

let currentActor = '';
let nameFirst = '';
let nameLast = '';

let blanksMixedGuesses = [];

let wrongGuesses = [];

let imgTag = $('#poster');

let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']



// *************************************************************************************************************************
//              EVENT HANDLERS                           EVENT HANDLERS                           EVENT HANDLERS
// *************************************************************************************************************************

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
    currentActor = actors[Math.floor(Math.random() * actors.length)].toUpperCase();

    nameFirst = currentActor.split(' ')[0];
    nameLast = currentActor.split(' ')[1];
    console.log('currentActor: ', currentActor)
    console.log('numBlanks first & last: ', nameFirst.length, nameLast.length)
    // fill blanksMixedGuesses based on currentActor
    for (i = 0; i < nameFirst.length; i++) {
        blanksMixedGuesses.push('_')
    }
    blanksMixedGuesses.push(' ')
    for (i = 0; i < nameLast.length; i++) {
        blanksMixedGuesses.push('_')
    }
    console.log('mixed', blanksMixedGuesses)






    //***************************************
    //       AJAX SEARCH FOR ACTORS MOVIES

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
        for (i in response.results[0].known_for) {
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
//                   ON KEY UP FUNCTION
// ***********************************************************
$(document).on('keyup', function (event) {
    const letterGuessed = event.key.toUpperCase();
    console.log(letterGuessed)
    // if (gameStatus === 'play') {
        checkGuess(letterGuessed);
        afterGuess();
    // }
})
// ***********************************************************
///  ^^^^^^^^^^^^^^^^^ ON KEY UP FUNCTION ^^^^^^^^^^^^^^^^^^^
// ***********************************************************


// ***********************************************************
//                   CHECK GUESS FUNCTION
// ***********************************************************
let checkGuess = function (guess) {

    // If character entered is not A-Z
    if (!alphabet.includes(guess)) {
        // alert("Enter a letter.")
    }

    // If guess has already been guessed
    else if (wrongGuesses.includes(guess) || blanksMixedGuesses.includes(guess)) {
        alert("Letter already guessed!");
    }

    // If Letter Guessed IS in the word
    else if (nameFirst.includes(guess) || nameLast.includes(guess)) {
        console.log("Nice guess!")
        // Compares each letter to see if it matches guess
        for (i = 0; i < nameFirst.length; i++) {
            if (guess == nameFirst[i]) {
                blanksMixedGuesses[i] = guess
            }
        }
        for (i = 0; i < nameLast.length; i++) {
            if (guess == nameLast[i]) {
                blanksMixedGuesses[ nameFirst.length + 1 + i ] = guess
            }
        }
    }

    // If Letter Guessed is NOT in the word
    else {
        console.log("Guess again");
        wrongGuesses.push(guess);
        guessesLeft--;
        console.log(wrongGuesses);
        // $('lettersGuessesd').HTML(wrongGuesses.join(", "));
    };
console.log(blanksMixedGuesses)
}
// ***********************************************************
///  ^^^^^^^^^^^^^^^^^ CHECK GUESS FUNCTION ^^^^^^^^^^^^^^^^^^^
// ***********************************************************


// ***********************************************************
//                   AFTER GUESS FUNCTION
// ***********************************************************
let afterGuess = function () {
    // Update display data
    $('#blankWord').html(blanksMixedGuesses.join(' '));
    // Checks remaining guesses to see if you lost
    if (guessesLeft == 0) {
        youLose();
    }
    // // Checks to see if any blanks are remaining and game is won
    if (!blanksMixedGuesses.includes("_")) {
        youWin()
    }
}
// ***********************************************************
///  ^^^^^^^^^^^^^^^^^ AFTER GUESS FUNCTION ^^^^^^^^^^^^^^^^^^^
// ***********************************************************


// ***********************************************************
//                  GIVE HINT BUTTON FUNCTION
// ***********************************************************
$('#hint').on('click', function () {



})
// ***********************************************************
//  ^^^^^^^^^^^^^^ GIVE HINT BUTTON FUNCTION ^^^^^^^^^^^^^^^^
// ***********************************************************

imgTag.src = posterSources[0];

// ***********************************************************
//                  YOU WIN FUNCTION
// ***********************************************************
let youWin = function () {
    alert('you win!')
    gameStatus = "over";
    wins++;
}
// ***********************************************************
//  ^^^^^^^^^^^^^^ YOU WIN FUNCTION ^^^^^^^^^^^^^^^^
// ***********************************************************


// ***********************************************************
//                  YOU LOSE FUNCTION
// ***********************************************************
let youLose = function () {
    alert('you lose')
    gameStatus = "over";
    losses++;
}
// ***********************************************************
//  ^^^^^^^^^^^^^^ YOU LOSEE FUNCTION ^^^^^^^^^^^^^^^^
// ***********************************************************




// *************************************************************************************************************************
// ^^^^^^^^^^^ EVENT HANDLERS ^^^^^^^^^^^^^^^^^^^^^^ EVENT HANDLERS ^^^^^^^^^^^^^^^^^^^^^^^^^^ EVENT HANDLERS ^^^^^^^^^^^^^
// *************************************************************************************************************************




