var topics=['frog', 'cat', 'dog', 'bird', 'tiger', 'lion', 'rabbit'];

var searchedArray = [];
var newGifs;
var gifIndex;

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
createButtons();

$(document).on('click', '.buttons', function() {
    var searchTopic = $(this).text();
    var searchURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTopic + "&api_key=Do8Pj3iCmTJPnLtNeHPOBcekhoZ5JwSW&limit=10"
    $('#gifs').empty();
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
            }
        });
});

$(document).on('click', '.gifDiv',  function() {
    gifIndex = $(this).attr('data-index');
    console.log(gifIndex);
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

