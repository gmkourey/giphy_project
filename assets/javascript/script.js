var topics=['frog', 'cat', 'dog', 'bird', 'tiger', 'lion', 'rabbit'];

var searchedArray = [];
var newGifs;
var gifIndex;

function createButtons() {
    var newDiv = $('<div>');
    newDiv.attr('id', 'buttonDiv');
    $('.container').prepend(newDiv);
    for(var i = 0; i < topics.length; i++) {
        var newButton = $('<button>');
        newButton.text(topics[i]);
        newButton.attr('class', 'buttons');
        $('#buttonDiv').append(newButton);
    }
}

function addOption() {
    var userInput = $('#user-input').val();
    var newButton = $('<button>');
    newButton.attr('class', 'buttons');
    newButton.text(userInput);
    $('#buttonDiv').append(newButton);

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
            newGifs = $('<img>');
            newGifs.attr('src', response.data[i].images.fixed_height_still.url);
            newGifs.attr('class', 'gif-images');
            newGifs.attr('data-index', i);
            newGifs.attr('id', 'gif' + i);
            $('#gifs').append(newGifs);
            }
        });
});

$(document).on('click', '.gif-images',  function() {
    gifIndex = $(this).attr('data-index');
    console.log(gifIndex);
    $('#gif' + gifIndex).attr('src', searchedArray.data[gifIndex].images.fixed_height.url);

});

$('#submit').on('click', function() {
    addOption();
});

