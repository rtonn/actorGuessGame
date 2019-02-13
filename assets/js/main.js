
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

    pickActor()

})
//     ^^^^^^   AJAX CALL ACTORS ^^^^^^
//***********************************************

// ***********************************************************
//  ^^^^^^^^^^^^^^^^ START BUTTON FUNCTION ^^^^^^^^^^^^^^^^^^
// ***********************************************************


// ***********************************************************
//               PICK / DISPLAY ACTOR FUNCTION
// ***********************************************************
let pickActor = function () {
    // pick an actor randomly from actors array
    currentActor = actors[Math.floor(Math.random() * actors.length)].toUpperCase();

    // fixes é in Beyoncé (Googled)
    currentActor = currentActor.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    // make sure actor hasn't already been used

    nameFirst = currentActor.split(' ')[0];
    nameLast = currentActor.split(' ')[1];
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
        console.log(response.results[0].known_for)
        // loop through popular movies to get 3 movie poster source URL's
        for (i in response.results[0].known_for) {
            posterSources.push('https://image.tmdb.org/t/p/w1280/' + response.results[0].known_for[i].poster_path)
        }
        console.log(posterSources)
        
        // set main picture source
        $('#mainPoster').attr('src', posterSources[0])
    })

    //   ^^^^^^   AJAX CALL MOVIES ^^^^^^
    //***************************************


// ***********************************************************
//  ^^^^^^^^^^^^^^ PICK / DISPLAY ACTOR FUNCTION ^^^^^^^^^^^^^
// ***********************************************************

// ^^^^^^^^^^^   Youtube IFrame Player API   ^^^^^^^^^
//************************************************************
// 2. This code loads the IFrame Player API code asynchronously.
// var tag = document.createElement('script');

// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//  ^^^^^^^ Youtube DATA API AJAX CAll ^^^^^^
    //****************************************

    console.log("These are the actors: ", actors);
    console.log("Chosen actor: ", currentActor);
    
      var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&q=" + currentActor + "movie trailer" + "&type=video&key=AIzaSyADSkhhHq8Y4hSUw8CeYRNyrlWrlzYxaUQ";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
    

        console.log(response);

        
        var results1 = response.items[0].snippet.title;
        console.log("Movie Title: ", results1)
        var results2 = response.items[0].id.videoId;
        console.log("Youtube Video ID: ", results2)
    

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
    // var videoId = results2;
        var player;
        window.onYouTubeIframeAPIReady = function() { } 

        player = new YT.Player('player', {
            height: '280',
            width: '380',
            // videoId: 'vo5cB94nPRU',
            videoId: results2,
            // events: {
            // 'onReady': onPlayerReady,
            // 'onStateChange': onPlayerStateChange
            // }
        });
    

    //  // 4. The API will call this function when the video player is ready.
    //  function onPlayerReady(event) {
    //     event.target.playVideo();
    //   }

    //   // 5. The API calls this function when the player's state changes.
    //   //    The function indicates that when playing a video (state=1),
    //   //    the player should play for six seconds and then stop.
    //   var done = false;
    //   function onPlayerStateChange(event) {
    //     if (event.data == YT.PlayerState.PLAYING && !done) {
    //       setTimeout(stopVideo, 10000);
    //       done = true;
    //     }
    //   }
    //   function stopVideo() {
    //     player.stopVideo();
    //   }
    });
}
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
$("#hint").on("click", function () {
    console.log('give hint clicked');
    // save old poster URL
    let oldPoster = $('#mainPoster').attr('src');
    // move Hint 1 to Hint 2
    $('#hint2').attr('src') = $('#hint1').attr('src')
    // move old poster URL to Hint 1
    $('#hint' + hintNum++).attr('src', oldPoster);
    // set current hint to new poster
    $('#mainPoster').attr('src', posterSources[hintnum++]);
  });
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
}
// ***********************************************************
//  ^^^^^^^^^^^^^^ YOU WIN FUNCTION ^^^^^^^^^^^^^^^^
// ***********************************************************


// ***********************************************************
//                  YOU LOSE FUNCTION
// ***********************************************************
let youLose = function () {
    console.log('you lose')
    gameStatus = "over";
    losses++;
}
// ***********************************************************
//  ^^^^^^^^^^^^^^ YOU LOSE FUNCTION ^^^^^^^^^^^^^^^^
// ***********************************************************


// ***********************************************************
//                  RESET GAME FUNCTION
// ***********************************************************
let resetGame = function () {
    movies = [];
    posterSources = [];
    gameStatus = 'start';
    currentActor = '';
    nameFirst = '';
    nameLast = '';
    blanksMixedGuesses = [];
    wrongGuesses = [];

    pickActor()

}
// ***********************************************************
//  ^^^^^^^^^^^^^^ RESET GAME FUNCTION ^^^^^^^^^^^^^^^^
// ***********************************************************



// *************************************************************************************************************************
// ^^^^^^^^^^^ EVENT HANDLERS ^^^^^^^^^^^^^^^^^^^^^^ EVENT HANDLERS ^^^^^^^^^^^^^^^^^^^^^^^^^^ EVENT HANDLERS ^^^^^^^^^^^^^
// *************************************************************************************************************************




