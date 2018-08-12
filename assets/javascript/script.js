var topics=['frog', 'cat', 'dog', 'bird', 'tiger', 'lion', 'rabbit'];

var searchedArray = [];
var newGifs;
var gifIndex;
var numOfGifs;
var searchTopic;
var favoritesArr = [];

function favorites(url, rating) {
    this.url = url;
    this.rating = rating;
}

function createButtons() {
    $('#buttonContainer').empty()
    for(var i = 0; i < topics.length; i++) {
        var newButton = $('<button>');
        newButton.text(topics[i]);
        newButton.attr('class', 'buttons');
        $('#buttonContainer').append(newButton);
    }
}

function addOption() {
    var userInput = $('#user-input').val();
    var newButton = $('<button>');
    newButton.attr('class', 'buttons');
    newButton.text(userInput);
    $('#buttonContainer').append(newButton);

}

function createGifs() {
    numOfGifs = 10;
    searchTopic = $(this).text();
    var searchURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTopic + '&api_key=Do8Pj3iCmTJPnLtNeHPOBcekhoZ5JwSW&limit=' + numOfGifs;
    $('#gifs').empty();
    $('#more-gifs').css('display', 'inline-block');
    $.ajax({
        url: searchURL,
        method: "GET"
    }).then(function(response) {
        searchedArray = response;
        for(var i = 0; i < response.data.length; i++) {
            var newDiv = $('<div>');
            newDiv.attr('id', 'gifDiv' + i);
            newDiv.attr('class', 'gifDiv');
            newDiv.attr('data-index', i);
            $('#gifs').append(newDiv);
            newGifs = $('<img>');
            newGifs.attr('src', response.data[i].images.fixed_height_still.url);
            newGifs.attr('class', 'gif-images');
            newGifs.attr('id', 'gif' + i);
            $('#gifDiv' + i).append(newGifs);
            newRating = $('<p>');
            newRating.text('GIF Rating: ' + ((response.data[i].rating).toUpperCase()));
            newRating.attr('class', 'rating');
            $('#gifDiv' + i).append(newRating);
            var newButton = $('<button>');
            newButton.text('Add To Favorites');
            newButton.attr('class', 'favorites');
            newButton.attr('data-url', response.data[i].images.fixed_height.url);
            newButton.attr('data-rating', response.data[i].rating);
            $('#gifDiv' + i).append(newButton);
            }
        });
}
createButtons();

$(document).on('click', '.buttons', createGifs);

$(document).on('click', '.gifDiv',  function() {
    gifIndex = $(this).attr('data-index');
    $('#gif' + gifIndex).attr('src', searchedArray.data[gifIndex].images.fixed_height.url);

});

$('#submit').on('click', function(event) {
    if($('#user-input').val() !== '') {
    topics.push($('#user-input').val().trim());
    createButtons();
}
event.preventDefault();
$('#user-input').val('');
});

$('#more-gifs').on('click', function() {
    numOfGifs += 10;
    var searchURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTopic + "&api_key=Do8Pj3iCmTJPnLtNeHPOBcekhoZ5JwSW&limit=" + numOfGifs + '"';
    $('#gifs').empty();
    $('#more-gifs').css('display', 'inline-block');
    $.ajax({
        url: searchURL,
        method: "GET"
    }).then(function(response) {
        searchedArray = response;
        for(var i = 0; i < response.data.length; i++) {
            var newDiv = $('<div>');
            newDiv.attr('id', 'gifDiv' + i);
            newDiv.attr('class', 'gifDiv');
            newDiv.attr('data-index', i);
            $('#gifs').append(newDiv);
            newGifs = $('<img>');
            newGifs.attr('src', response.data[i].images.fixed_height_still.url);
            newGifs.attr('class', 'gif-images');
            newGifs.attr('id', 'gif' + i);
            $('#gifDiv' + i).append(newGifs);
            newRating = $('<p>');
            newRating.text('GIF Rating: ' + ((response.data[i].rating).toUpperCase()));
            newRating.attr('class', 'rating');
            $('#gifDiv' + i).append(newRating);
            var newButton = $('<button>');
            newButton.text('Add To Favorites');
            newButton.attr('class', 'favorites');
            newButton.attr('data-url', response.data[i].images.fixed_height.url);
            newButton.attr('data-rating', response.data[i].rating);
            $('#gifDiv' + i).append(newButton);
            }
        });
});

$(document).on('click', '.favorites', function () {
    var gifURL = $(this).attr('data-url');
    var gifRating = $(this).attr('data-rating');
    var NewFavorite = new favorites(gifURL, gifRating);
    favoritesArr.push(NewFavorite);
    localStorage.setItem('array', JSON.stringify(favoritesArr));
});

$('#viewFavorites').on('click', function() {
    $('#gifs').empty();
    $('#moregifs').css('display', 'none');
    if(favoritesArr.length > 0) {
    favoritesArr = JSON.parse(localStorage.getItem('array'));
    for(var i = 0; i < favoritesArr.length; i++) {
        var newDiv = $('<div>');
        newDiv.attr('id', 'gifDiv' + i);
        newDiv.attr('class', 'gifDiv');
        $('#gifs').append(newDiv);
        newGifs = $('<img>');
        newGifs.attr('src', favoritesArr[i].url);
        newGifs.attr('class', 'gif-images');
        $('#gifDiv' + i).append(newGifs);
        newRating = $('<p>');
        newRating.text('GIF Rating: ' + ((favoritesArr[i].rating).toUpperCase()));
        newRating.attr('class', 'rating');
        $('#gifDiv' + i).append(newRating);
    }
} else {
    var noGIF = $('<p>');
    noGIF.text('There are currently no GIF\'s in your favorites');
    noGIF.css({'text-align': 'center','font-size': '30px'})
    $('#gifs').append(noGIF);
}
});

