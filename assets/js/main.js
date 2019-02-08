// **********************************
//          EVENT HANDLERS
//***********************************




//***********************************
//          EVENT HANDLERS
//***********************************
var key = 'a2263fe97d8f900e28e6323428ce7aa9'

var queryURL = 'https://api.themoviedb.org/3/movie/550?api_key=' + key



'https://api.themoviedb.org/3/discover/movie?page=1&include_video=false&include_adult=false&sort_by=popularity.desc&language=en-US&api_key=a2263fe97d8f900e28e6323428ce7aa9' 

$.ajax({
    url: queryURL,
    method: 'GET'
}).then(function(response){
    console.log(response)
})
