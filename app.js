$(document).ready(function() {
    console.log('hello world');
    });
    
    apiKey = 'jrpNV9H93rFtvYVzLvedJKvh2j48ZUj8';
    
    var shows = ["Doug", "Salute Your Shorts", "Friends", "Family Matters", "The Fresh Prince of Bel-Air", "Boy Meets World",
    "Happy Days", "The O.C.", "Saved By The Bell", "Full House"];
    
    function displayTvShow() {
    
        var show = $(this).attr("data-name");
        var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${show}&limit=10&offset=0&rating=G&lang=en`;
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            
            var results = response.data;
            console.log(results);

            for (var i = 0; i < results.length; i++) {

                var showDiv = $("<div class='show'>");
                
                var showGif = $("<img>");
                showGif.attr("src", response.data[i].images.original.url);
                var showImage = $("<img>");
                showImage.attr("src", response.data[i].images.original_still.url);
                showDiv.append(showImage);

                var rating = response.data[i].rating;
                var ratingText = $("<p>").text("Rating: " + rating);
                showDiv.append(ratingText);
                
                $("#tvShowView").prepend(showDiv);

                $(".show").on('click', function() {
                // if (showDiv === showGif) {
                // showDiv.html(showGif);
                // }
                showDiv.html(showGif);
                $(".show").on('click', function() {
                    showDiv.html(showImage);
            });
            });
        }
    });
    }
    
    $(".gif").on('click', function() {
    var state = $(this).attr('data-state');
    console.log(state);

    if (state === 'still') {
        $(this).attr('data-state', 'animate');
        let animateUrl = $(this).attr('data-animate');
        $(this).attr('src', animateUrl);
        } else {
        $(this).attr('data-state', 'still');
        let stillUrl = $(this).attr('data-still');
        $(this).attr('src', stillUrl);
        }
    
    });

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
        var tvShow = $("#tvShowInput").val().trim();
        shows.push(tvShow);
        renderButtons();
    });
    
    $(document).on("click", ".showBtn", displayTvShow);
    
    renderButtons();