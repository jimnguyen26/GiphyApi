$(document).ready(function() {
console.log('hello world');
});

// apiKey = 'jrpNV9H93rFtvYVzLvedJKvh2j48ZUj8';

//url = 'https://api.giphy.com/v1/gifs/search?api_key=jrpNV9H93rFtvYVzLvedJKvh2j48ZUj8&q=&limit=25&offset=0&rating=G&lang=en';

var shows = ["Doug", "Salute Your Shorts", "Step by Step"];

function displayTvShow() {

    var shows = $(this).attr("data-name");
    var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${shows}&limit=10&offset=0&rating=G&lang=en`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
    var showDiv = $("<div class='show'>");
    var imgURL = response.Poster;
    var image = $("<img>").attr("src", imgURL);
    showDiv.append(image);
    $("#tvShowView").prepend(showDiv);
    });
}



function renderButtons() {
    $("#buttonRow").empty();
    for (var i = 0; i < shows.length; i++) {
    var a = $("<button>");
    a.addClass("showBtn");
    a.attr("data-name", shows[i]);
    a.text(shows[i]);
    $("#buttonRow").append(a);
    }
}


$("#addTvShow").on("click", function(event) {
    event.preventDefault();
    var tvShow = $("tvShowInput").val().trim();
    shows.push(tvShow);
    renderButtons();
});

$(document).on("click", ".showBtn", displayTvShow);

renderButtons();