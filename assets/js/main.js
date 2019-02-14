
// DECLARE VARIABLES
let guessesLeft = 10;
let gameScore = 0;
let wins = 0;
let losses = 0;

// array of names of actors
let actors = [];

// array of movies selected actor is in
let movies = [];

// popular movies for carousel
let popMovies = [];

let posterSources = [];

let gameStatus = 'over';

let currentActor = '';
let nameFirst = '';
let nameLast = '';
let actorID = '';
let photoSrc = '';

let blanksMixedGuesses = [];

let roundNumber = 1;

let wrongGuesses = [];

let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

var key = 'a2263fe97d8f900e28e6323428ce7aa9'



// *************************************************************************************************************************
//              EVENT HANDLERS                           EVENT HANDLERS                           EVENT HANDLERS
// *************************************************************************************************************************


//***************************************
//       AJAX POPULAR MOVIES

// SEARCH MOVIES URL
queryURL = 'https://api.themoviedb.org/3/movie/popular?api_key=' + key + '&language=en-US&page=1'


// SEARCH MOVIES AJAX CALL
$.ajax({
    url: queryURL,
    method: 'GET'
}).then(function (response) {
    for (i in response.results) {
        popMovies.push('https://image.tmdb.org/t/p/w1280/' + response.results[i].poster_path)
    }
})

// ^^^^ AJAX POPULAR MOVIES ^^^^
//***************************************


// ***********************************************************
//                   START BUTTON FUNCTION
// ***********************************************************

$(document).ready(function () {
    $('#startGame').on('click', function () {
        gameStatus = 'play';
        console.log('start game clicked')

        // create poster and hint elements
        $('#posterContainer').html(
            `<p class="type">Hint #<span id='hintNum'></span></p>
            <img id='mainPoster' src='' height='272px' width='176px'/>`
        )
        $('#hints').html(
            `<button id="hint">Give hint!</button>`
        )
        // create scoreboard
        $('#scoreboard').html(
            `<h1 class='roundNum'>Round ${roundNumber}</h1>
            <h1 class="type">Score: ${gameScore}</h1>
            <h3 id='score'></h3>`
        )
        $('#guesses').html(
            ` <h3 class="type">Letters Guessed: <strong id="lettersGuessed"></strong></h3>`
        )
        // scroll game into view
        $('html, body').animate({
            scrollTop: ($('#posterContainer').offset().top)
        }, 500);

        //********************************************
        //            AJAX CALL ACTORS

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

            pickActor()

        })
        //     ^^^^^^   AJAX CALL ACTORS ^^^^^^
        //***********************************************

    })
})
// ***********************************************************
//  ^^^^^^^^^^^^^^^^ START BUTTON FUNCTION ^^^^^^^^^^^^^^^^^^
// ***********************************************************

let roundScore = 90;

// ***********************************************************
//               PICK / DISPLAY ACTOR FUNCTION
// ***********************************************************
let pickActor = function () {
    // pick an actor randomly from actors array
    currentActor = actors[Math.floor(Math.random() * actors.length)].toUpperCase();

    // fixes é in Beyoncé (Googled)
    currentActor = currentActor.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    // make sure actor hasn't already been used

    currentActor.replace('-', ' ')
    nameFirst = currentActor.split(' ')[0];
    nameLast = currentActor.split(' ')[currentActor.split(' ').length - 1];

    console.log('currentActor: ', currentActor)
    console.log('numBlanks first & last: ', nameFirst.length, nameLast.length)
    // fill blanksMixedGuesses based on currentActor
    for (i = 0; i < nameFirst.length; i++) {
        blanksMixedGuesses.push('_')
    }
    blanksMixedGuesses.push('<br>')
    for (i = 0; i < nameLast.length; i++) {
        blanksMixedGuesses.push('_')
    }
    // Send blanksMixedGuesses to DOM
    $('#blankWord').html(blanksMixedGuesses.join(' '))
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
        console.log(response.results[0].id)
        actorID = response.results[0].id
        // loop through popular movies to get 3 movie poster source URL's
        for (i in response.results[0].known_for) {
            posterSources.push('https://image.tmdb.org/t/p/w1280/' + response.results[0].known_for[i].poster_path)
        }
        console.log(posterSources)

        // set main picture source
        $('#mainPoster').attr('src', posterSources[0])

        //***************************************
        //       AJAX SEARCH FOR ACTORS IMAGE

        // SEARCH IMAGES URL
        queryURL = 'https://api.themoviedb.org/3/person/' + actorID + '/images?api_key=' + key
        console.log(queryURL)
        // SEARCH IMAGES AJAX CALL
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {
            photoSrc = response.profiles[0].file_path
        })
        //       AJAX SEARCH FOR ACTORS IMAGE
        //***************************************

    })

    // ^^^^ AJAX SEARCH FOR ACTORS MOVIES ^^^^
    //***************************************

}
// ***********************************************************
//  ^^^^^^^^^^^^^^ PICK / DISPLAY ACTOR FUNCTION ^^^^^^^^^^^^^
// ***********************************************************


// ***********************************************************
//                   ON KEY UP FUNCTION
// ***********************************************************

$(document).on('keyup', function (event) {
    const letterGuessed = event.key.toUpperCase();
    if (gameStatus === 'play') {
        checkGuess(letterGuessed);
        afterGuess();
    }
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
        console.log("Enter a letter.")
    }

    // If guess has already been guessed
    else if (wrongGuesses.includes(guess) || blanksMixedGuesses.includes(guess)) {
        console.log("Letter already guessed!");
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
                blanksMixedGuesses[nameFirst.length + 1 + i] = guess
            }
        }
    }

    // If Letter Guessed is NOT in the word
    else {
        console.log("Guess again");
        wrongGuesses.push(guess);
        guessesLeft--;
        console.log(wrongGuesses);
        $('#lettersGuessed').html(wrongGuesses.join(", "));
    };
}
// ***********************************************************
/// ^^^^^^^^^^^^^^^^^ CHECK GUESS FUNCTION ^^^^^^^^^^^^^^^^^^^
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
        setTimeout(youWin(), 1500)
    }
}
// ***********************************************************
///  ^^^^^^^^^^^^^^^^^ AFTER GUESS FUNCTION ^^^^^^^^^^^^^^^^^^^
// ***********************************************************


// ***********************************************************
//                  GIVE HINT BUTTON FUNCTION
// ***********************************************************
let hintNum = 0
$(document).ready(function () {
    // display hintNum
    $('#hintNum').html(hintNum + 1);
    $(document).on('click', '#hint', function () {
        console.log('give hint clicked');
        if (hintNum < 2) {
            hintNum++;
            // update hintNum display
            $('#hintNum').html(hintNum + 1);
            // display hint
            $('#hints').append(
                `<img id='hint${hintNum}' height='136px' width='88px' alt='movie poster hint'>`
            )
            // reduce roundScore
            roundScore -= 30;
            // save old poster URL
            let oldPoster = $('#mainPoster').attr('src');
            // move Hint 1 to Hint 2
            hint2src = $('#hint2').attr('src')
            $('#hint1').attr('src', hint2src)
            // move old poster URL to Hint 1
            $('#hint' + hintNum).attr('src', oldPoster);
            // set current hint to new poster
            $('#mainPoster').attr('src', posterSources[hintNum]);
        }
        if (hintNum === 2) {
            $('#hint').remove()
        }
    });
})
// ***********************************************************
//  ^^^^^^^^^^^^^^ GIVE HINT BUTTON FUNCTION ^^^^^^^^^^^^^^^^
// ***********************************************************

// ***********************************************************
//                  YOU WIN FUNCTION
// ***********************************************************
let youWin = function () {
    console.log('you win!')
    gameStatus = "over";
    wins++;
    gameScore += roundScore;
    // update score display
    // show correct actor image
    $('#mainPoster').attr('src', 'https://image.tmdb.org/t/p/w1280/' + photoSrc)
    // display next round button

}
// ***********************************************************
//  ^^^^^^^^^^^^^^^^^^ YOU WIN FUNCTION ^^^^^^^^^^^^^^^^^^
// ***********************************************************


// ***********************************************************
//                  YOU LOSE FUNCTION
// ***********************************************************
let youLose = function () {
    console.log('you lose')
    gameStatus = "over";
    losses++;
    // show correct answer
    $('#blankWord').text(currentActor);
    // show actor image
    $('#mainPoster').attr('src', 'https://image.tmdb.org/t/p/w1280/' + photoSrc)
    // display next round button
}
// ***********************************************************
//  ^^^^^^^^^^^^^^ YOU LOSE FUNCTION ^^^^^^^^^^^^^^^^
// ***********************************************************


// ***********************************************************
//                    NEXT ROUND FUNCTION
// ***********************************************************
let nextRound = function () {
    clearAll();
    pickActor();

}
// ***********************************************************
//  ^^^^^^^^^^^^^^^^^^ NEXT ROUND FUNCTION ^^^^^^^^^^^^^^^^^^^
// ***********************************************************


// ***********************************************************
//                  RESET GAME FUNCTION
// ***********************************************************
let resetGame = function () {
    nextRound();
    score = 0;
    // display start game button

}
// ***********************************************************
//  ^^^^^^^^^^^^^^ RESET GAME FUNCTION ^^^^^^^^^^^^^^^^
// ***********************************************************


// ***********************************************************
//                  CLEAR ALL FUNCTION
// ***********************************************************
let clearAll = function () {

    $('#hint1').html('');
    $('#hint2').html('');
    $('#posterContainer').html(
        `<button id='startGame'>Start Game</button>`
    );

    movies = [];
    posterSources = [];
    gameStatus = 'start';
    currentActor = '';
    nameFirst = '';
    nameLast = '';
    blanksMixedGuesses = [];
    wrongGuesses = [];

}
// ***********************************************************
//  ^^^^^^^^^^^^^^ CLEAR ALL FUNCTION ^^^^^^^^^^^^^^^^
// ***********************************************************


// *************************************************************************************************************************
// ^^^^^^^^^^^ EVENT HANDLERS ^^^^^^^^^^^^^^^^^^^^^^ EVENT HANDLERS ^^^^^^^^^^^^^^^^^^^^^^^^^^ EVENT HANDLERS ^^^^^^^^^^^^^
// *************************************************************************************************************************




