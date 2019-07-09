require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');


var axios = require("axios");

var fs = require("fs");

var moment = require("moment");

var command = process.argv[2];
var searchItem = process.argv.slice(3).join(" ");


console.log("this command: ", command, searchItem)
execute(command, searchItem)

function execute(command, searchItem) {
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

        default:
            console.log("I do not understand.");

    };
}



function movieThis(searchItem) {
    axios.get("http://www.omdbapi.com/?t=" + searchItem + "&y=&plot=short&apikey=trilogy").then(
        function(response) {
            // console.log("Title of the movie: " + response.data.Title);
            // console.log("Year the movie came out: " + response.data.Year);
            // console.log("IMBD Rating of the movie: " + response.data.imdbRating);
            // console.log("Rotton Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
            // console.log("Country where the moivie was produced: " + response.data.Country);
            // console.log("Language of the move: " + response.data.Language);
            // console.log("Plot of the movie: " + response.data.Plot);
            // console.log("Actors in the movie: " + response.data.Actors);
            // console.log("----------------------------------------------------------------" + "\n")

            var text = "Year the movie came out: " + response.data.Year + "\n" +
                "IMBD Rating of the movie: " + response.data.imdbRating + "\n" +
                "Rotton Tomatoes Rating of the movie: " + response.data.Ratings[1].Value + "\n" +
                "Country where the moivie was produced: " + response.data.Country + "\n" +
                "Language of the move: " + response.data.Language + "\n" +
                "Plot of the movie: " + response.data.Plot + "\n" +
                "Actors in the movie: " + response.data.Actors + "\n" +
                "----------------------------------------------------------------" + "\n"

            console.log(text)


            fs.appendFile("log.txt", text, 'utf8', function(err) {
                if (err) {
                    console.log(err);
                }
                // console.log("Information has been added to the log.");
            });
        })

    .catch(function(error) {
        axios.get("http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy").then(
            function(response) {
                // console.log("Hmmm...that does not exist. May I suggest: " + response.data.Title);
                // console.log("Year the movie came out: " + response.data.Year);
                // console.log("IMBD Rating of the movie: " + response.data.imdbRating);
                // console.log("Rotton Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
                // console.log("Country where the movie was produced: " + response.data.Country);
                // console.log("Language of the movie: " + response.data.Language);
                // console.log("Plot of the movie: " + response.data.Plot);
                // console.log("Actors in the movie: " + response.data.Actors);
                // .log("----------------------------------------------------------------" + "\n")

                var text = "Hmmm...that does not exist. May I suggest: " + response.data.Year + "\n" +
                    "IMBD Rating of the movie: " + response.data.imdbRating + "\n" +
                    "Rotton Tomatoes Rating of the movie: " + response.data.Ratings[1].Value + "\n" +
                    "Country where the moivie was produced: " + response.data.Country + "\n" +
                    "Language of the move: " + response.data.Language + "\n" +
                    "Plot of the movie: " + response.data.Plot + "\n" +
                    "Actors in the movie: " + response.data.Actors + "\n" +
                    "----------------------------------------------------------------" + "\n"
                console.log(text)



                fs.appendFile("log.txt", text, function(err) {
                    if (err) {
                        console.log(err);
                    }
                    // console.log("Information has been added to the log.");
                });

            })

    })
}

function concertThis(searchItem) {

    axios.get("https://rest.bandsintown.com/artists/" + searchItem + "/events?app_id=codingbootcamp").then(
            function(response) {
                // console.log("Artist searched: ", searchItem)
                // console.log("Artist will be playing next at: " + response.data[0].venue.name);
                // console.log("The venue is located at: " + response.data[0].venue.city + ", " + response.data[0].venue.country);
                // console.log("All artists being featured at this event: " + response.data[0].lineup)
                // console.log("The date and time of this event: " + moment(response.data[0].datetime).format("MMMM Do YYYY, h:mm a"));
                // console.log("Tickets are available for purchase at: " + response.data[0].offers[0].url);
                // console.log("Tickets for this event is currently: " + response.data[0].offers[0].status);
                // console.log("-------------------------------------------------------------------" + "\n")
                var search = "Artist searched: " + searchItem + "\n"
                console.log(search)
                writeLog(search)

                for (var i = 0; i < response.data.length; i++) {


                    var text = "Artist will be playing next at: " + response.data[i].venue.name + "\n" +
                        "The venue is located at: " + response.data[i].venue.city + ", " + response.data[i].venue.country + "\n" +
                        "All artists being featured at this event: " + response.data[i].lineup + "\n" +
                        "The date and time of this event: " + moment(response.data[i].datetime).format("MMMM Do YYYY, h:mm a") + "\n" +
                        "Tickets are available for purchase at: " + response.data[i].offers[0].url + "\n" +
                        "Tickets for this event is currently: " + response.data[i].offers[0].status + "\n" +
                        "-------------------------------------------------------------------" + "\n"
                    console.log(text)
                    writeLog(text)
                }

            })
        .catch(function(error) {
            console.log("ERROR: ", error)
            axios.get("https://rest.bandsintown.com/artists/rolling+stones/events?app_id=codingbootcamp").then(
                function(response) {
                    console.log("%%%%%%%%%%%%ERRROR")
                        // console.log("Hmmm, I don't see that,  May I suggest The Rolling Stones.", )
                        // console.log("Artist will be playing next at: " + response.data[0].venue.name);
                        // console.log("The venue is located at: " + response.data[0].venue.city + ", " + response.data[0].venue.country);
                        // console.log("All artists being featured at this event: " + response.data[0].lineup)
                        // console.log("The date and time of this event: " + moment(response.data[0].datetime).format("MMMM Do YYYY, h:mm a"));
                        // console.log("Tickets are available for purchase at: " + response.data[0].offers[0].url);
                        // console.log("Tickets for this event is currently: " + response.data[0].offers[0].status);
                        // console.log("-------------------------------------------------------------------" + "\n")

                    var text = "Hmmm, I don't see that,  May I suggest The Rolling Stones." + "\n" +
                        "Artist will be playing next at: " + response.data[0].venue.name + "\n" +
                        "The venue is located at: " + response.data[0].venue.city + ", " + response.data[0].venue.country + "\n" +
                        "All artists being featured at this event: " + response.data[0].lineup + "\n" +
                        "The date and time of this event: " + moment(response.data[0].datetime).format("MMMM Do YYYY, h:mm a") + "\n" +
                        "Tickets are available for purchase at: " + response.data[0].offers[0].url + "\n" +
                        "Tickets for this event is currently: " + response.data[0].offers[0].status + "\n" +
                        "-------------------------------------------------------------------" + "\n"
                    console.log(text)

                    fs.appendFile("log.txt", text, function(err) {
                        if (err) {
                            console.log(err);
                        }
                        //console.log("Information has been added to the log.");
                    });

                })
        })


}

function spotifyThis(searchItem) {
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: "track", query: searchItem }, function(err, data) {
        if (err) {
            console.log(`!!!Error occured: ${err})`);
            return;
            ///Return "I saw the Sign by Ace of Base"
        }
        // console.log(data);
        var songs = data.tracks.items;
        if (songs.length === 0) {
            spotifyThis("I saw the Sign");
        }
        for (var i = 0; i < songs.length; i++) {
            // console.log(songs[0]);

            var text = "Artist(s): " + songs[i].artists[0].name + "\n" +
                "Song Name: " + songs[i].name + "\n" +
                "Preview songs: " + songs[i].preview_url + "\n" +
                "Album: " + songs[i].album.name + "\n" +
                "---------------------------------------" + "\n"

            console.log(text)

            writeLog(text)
        }
    })
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }

        console.log(data);

        var dataArr = data.split(",");
        searchItem = dataArr[1];
        execute(dataArr[0], dataArr[1])

    });


}


function writeLog(text) {

    fs.appendFile("log.txt", text, 'utf8', function(err) {
        if (err) {
            console.log(err);
        }
        // console.log("Information has been added to the log.");
    });

}