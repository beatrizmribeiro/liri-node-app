// Nice job defining your global vars at the top of the file 👌

//code to grab the data from keys.js
var fs = require('fs');

var keys = require('./keys.js')

var Twitter = require('twitter');

var spotify = require('node-spotify-api')

var request = require('request');

var twitterKeys = keys.twitterKeys;

var spotifyKeys = keys.spotifyKeys; 

var spotify = new spotify(spotifyKeys);



var nodeArgs = process.argv;

var selection = process.argv[2];
// You didn't end up using this variable anywhere else in you file,
// but I like how you used the slice/join method combo - I think if
// you had just joined using a space instead of a plus, then you could
// have used this variable in all the places where you use a for loop
// to iterate over the nodeArgs array above to build up songName and movieName.
var query = process.argv.slice(3).join('+');

// function request my last 20 tweets {
function tweets() {
  var Twitter = require('twitter');
  var client = new Twitter(keys.twitterKeys);
  var params = {
    screen_name: "beatrizzzz_m",
    count: 20
  }
  client.get("statuses/user_timeline", params, function(error, tweet, response) {
    if (!error) {
      tweet.forEach(function(e) {
        console.log(e.text);
        console.log(e.created_at);
        console.log("---------");
      })
    }
  });
}




switch (selection){

//request to read a file random.txt
	case "do-what-it-says":
	fs.readFile("random.txt", "utf8", function(err, data) {
  if (err) {
    return console.log(err);

}
  // so now that you have the data from the random.txt file
  // you also want to figure out which action to run:
  // my-tweets, spotify-this-song, or movie-this
  // and then you want to run it 🤓
 console.log(data);



  });


break;


case "my-tweets":
  // I really like how you broke out your tweets logic into a function
  // I'd suggest doing this for all the other pieces of logic as well
	tweets();



break;
// Loop through all the words in the node argument
//request song from spotify
case "spotify-this-song":

var songName = "";

for (var i = 3; i < nodeArgs.length; i++){
	if (i > 3 && i < nodeArgs.length) {
		songName = songName + "+" + nodeArgs[i];
	}
	else {
		songName += nodeArgs[i];
	}
}

if (songName === ""){
	songName = " The Sign by Ace of Base"
};

 	spotify.search({ type: 'track', query: songName }, function(err, data) {
  		if (err) {
		    return console.log('Error occurred: ' + err);
	  } 
  		console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
  		console.log("Song: " + data.tracks.items[0].name);
  		console.log("Link: " + data.tracks.items[0].external_urls.spotify); 
  		console.log("Album: " + data.tracks.items[0].album.name);   
		});

break;

case "movie-this":

var movieName = "";



// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    movieName = movieName + "+" + nodeArgs[i];
  }
  else {
    movieName += nodeArgs[i];
  }
}

if (movieName === "") {
		movieName = "Mr.Nobody"
	}
// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t="  + movieName +  "&y=&plot=short&apikey=40e9cece";
// This line is just to help us debug against the actual URL.
console.log(queryUrl);


request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {


    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log(" ")
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot "+ JSON.parse(body).Plot);
    console.log("Actor: " + JSON.parse(body).Actors);

  

}
});




}


//Function that logs console searches to log.txt file
fs.appendFile("log.txt", process.argv, function(error){
  if (error) {
    console.log(error);
  }
  console.log("Request Logged!");
});
