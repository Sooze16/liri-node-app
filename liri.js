require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');


var axios = require("axios");

var fs = require("fs");

var moment = require("moment");

var command = process.argv[2];
var searchItem = process.argv.slice(3).join(" ");


switch (command) {
    case "concert-this":
        concertThis(searchItem);
        break;
    case "spotify-this-song":
        spotifyThis(searchItem);
        break;
    case "movie-this":
        movieThis(searchItem);
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;
};



function movieThis(searchItem) {
    axios.get("http://www.omdbapi.com/?t=" + searchItem + "&y=&plot=short&apikey=trilogy").then(
        function(response) {
            console.log("Title of the movie: " + response.data.Title);
            console.log("Year the movie came out: " + response.data.Year);
            console.log("IMBD Rating of the movie: " + response.data.imdbRating);
            console.log("Rotton Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
            console.log("Country where the moivie was produced: " + response.data.Country);
            console.log("Language of the move: " + response.data.Language);
            console.log("Plot of the movie: " + response.data.Plot);
            console.log("Actors in the movie: " + response.data.Actors);
            console.log("----------------------------------------------------------------" + "\n")

        })

    .catch(function(error) {
        axios.get("http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy").then(
            function(response) {
                console.log("Title of the movie: " + response.data.Title);
                console.log("Year the movie came out: " + response.data.Year);
                console.log("IMBD Rating of the movie: " + response.data.imdbRating);
                console.log("Rotton Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
                console.log("Country where the moivie was produced: " + response.data.Country);
                console.log("Language of the move: " + response.data.Language);
                console.log("Plot of the movie: " + response.data.Plot);
                console.log("Actors in the movie: " + response.data.Actors);
                console.log("----------------------------------------------------------------" + "\n")

            })
    })
}

function concertThis(searchItem) {

    axios.get("https://rest.bandsintown.com/artists/" + searchItem + "/events?app_id=codingbootcamp").then(
            function(response) {
                console.log("Artist searched: ", searchItem)
                console.log("Artist will be playing next at: " + response.data[0].venue.name);
                console.log("The venue is located at: " + response.data[0].venue.city + ", " + response.data[0].venue.country);
                console.log("All artists being featured at this event: " + response.data[0].lineup)
                console.log("The date and time of this event: " + moment(response.data[0].datetime).format("MMMM Do YYYY, h:mm a"));
                console.log("Tickets are available for purchase at: " + response.data[0].offers[0].url);
                console.log("Tickets for this event is currently: " + response.data[0].offers[0].status);
                console.log("-------------------------------------------------------------------" + "\n")

            })
        .catch(function(error) {
            axios.get("https://rest.bandsintown.com/artists/rolling+stones/events?app_id=codingbootcamp").then(
                function(response) {
                    console.log("Artist searched: rolling stones", )
                    console.log("Artist will be playing next at: " + response.data[0].venue.name);
                    console.log("The venue is located at: " + response.data[0].venue.city + ", " + response.data[0].venue.country);
                    console.log("All artists being featured at this event: " + response.data[0].lineup)
                    console.log("The date and time of this event: " + moment(response.data[0].datetime).format("MMMM Do YYYY, h:mm a"));
                    console.log("Tickets are available for purchase at: " + response.data[0].offers[0].url);
                    console.log("Tickets for this event is currently: " + response.data[0].offers[0].status);
                    console.log("-------------------------------------------------------------------" + "\n")

                })
        });
}

function spotifyThis(searchItem) {
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: "track", query: searchItem }, function(err, data) {
        if (err) {
            console.log(`!!!Error occured: ${err})`);
            return;
        }
        // console.log(data);
        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
            // console.log(songs[0]);
            console.log("Artist(s): " + songs[i].artists[0].name);
            console.log("Song Name: " + songs[i].name);
            console.log("Preview songs: " + songs[i].preview_url);
            console.log("Album: " + songs[i].album.name);
            console.log("---------------------------------------" + "\n")
        }
    })
}