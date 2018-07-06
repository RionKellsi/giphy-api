var musicArtist = ["Drake", "Gucci Mane", "Lil Wayne", "Mariah Carey", "Trey Songz", "Beyonce", "Jay-Z", "Chris Brown", "The Weeknd"];
var animatedGif;
var pausedGif;
var stillGif;
var currentGif;

function createGifButtons() {
    //clear div so there aren't any duplicate buttons
    $("#artistBtns").empty();

    //loop through musicArtist Array
    for (var i = 0; i < musicArtist.length; i++) {
        // create buttons for each artist.
        var gifButton = $("<button>");
        gifButton.addClass("artist-btn");
        gifButton.addClass("btn btn-outline-success btn-sm");
        gifButton.attr("data-name", musicArtist[i]);
        gifButton.text(musicArtist[i]);
        $("#artistBtns").append(gifButton);
    }

    $(".artist-btn").on("click", function () {
        $("#images").empty();
        var currentArtist = $(this).data("name");
        var gifyUrl = "http://api.giphy.com/v1/gifs/search?q=" + currentArtist + "&api_key=1QfM2fd49lZJ5CbDFYZP72N2gmieBEIY&limit=10";
        console.log(gifyUrl)
        $.ajax({
            url: gifyUrl,
            method: "GET"
        }).done(function (giphy) {
            $("#images").empty();
            currentGif = giphy.data;
            if (currentGif == "") {
                alert("There isn't a gif for this selected button")
            }
            $.each(currentGif, function (index, value) {
                animatedGif = value.images.original.url;
                pausedGif = value.images.original_still.url;
                var theRating = value.rating;
                if (theRating == " ") {
                    theRating = "untrated";
                }
                var rating = $("<h4>").html("Rated: " + theRating).addClass("ratingStyle");
                stillGif = $("<img>").attr("data-animate", animatedGif).attr("data-paused", pausedGif).attr("src", pausedGif).addClass("playOnHover");
                var fullGifDisplay = $("<button>").append(rating, stillGif)
                $("#images").append(fullGifDisplay)

            });
        });
    });
    $(document).on("mouseover", ".playOnHover", function () {
        $(this).attr("src", $(this).data("animated"));
    });
    $(document).on("mouseleave", ".playOnHover", function () {
        $(this).attr("src", $(this).data("paused"));
    });

    //sets a button from input
    $('#addArtist').on('click', function () {
        var newArtist = $("#newArtistInput").val().trim();
        musicArtist.push(newArtist);
        createGifButtons();
        $("#newArtistInput").empty();
        return false;
    });
};



createGifButtons();