require("dotenv").config();

var keys = require("./keys.js");

var axios = require("axios");

axios.get("http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy").then(
    function(response) {
        console.log("The movie's rating is: " + response.data.imdbRating);
    });