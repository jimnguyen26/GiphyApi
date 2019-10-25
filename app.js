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
                
                var showImage = $("<img>");
                showImage.attr("src", response.data[i].images.fixed_height.url);
                showDiv.append(showImage);
                
                $("#tvShowView").prepend(showDiv);
            }
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