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

var query = process.argv.slice(3).join('+');

// function tweets() {
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


case "my-tweets":
	tweets();
    //get keys from key.js
    // var key = require("./keys.js");
    // var keys = key.twitterKeys;

    // //crate client object with authentication keys
    // var client = new Twitter({
    //   consumer_key: keys.consumer_key,
    //   consumer_secret: keys.consumer_secret,
    //   access_token_key: keys.access_token_key,
    //   access_token_secret: keys.access_token_secret
    // });
    // //just created twitter account - many profile info missing, maybe that's why my username does not return any text. 
    // //so used an established user to test search by query
    // client.post('search/tweets', {q:'@beatrizzzz_m', count:10}, function(error, tweets, response) {
    //   if(error) {
    //       return console.log(error);
    //     }
    //       //loop to get list of tweets
    //       for (var i = 0; i < tweets.statuses.length ; i++ ){
    //       console.log(tweets.statuses[i].text);
    //       }
    //     console.log("----------------------------------------------------------------------");
    // });

// var params = {screen_name: 'beatrizzzz_m'};
//   	client.get('statuses/user_timeline', params, function(error, tweets, response) {
//   	  if (!error) {
//   	    for (var i = 0; i < tweets.length; i++) {
//   	    	console.log(tweets[i].text);
//   	    	console.log(tweets[i].created_at);
//   	    };
//   	  };
//   	});

// var screenName = {screen_name: 'beatrizzzz_m'};
//   client.get('statuses/user_timeline', screenName, function(error, tweets, response){
//     if(error)
//       console.log(error);

//     if(!error){
//       for(var i = 3; i<tweets.length; i++){
//         var date = tweets[i].created_at;
//         console.log("@beatrizzzz_m: " + tweets[i].text + " Created At: " + date.substring(0, 19));
//         console.log("-----------------------");
        
//         //adds text to log.txt file
//         //fs.appendFile('log.txt', "@beatrizzzz_m: " + tweets[i].text + " Created At: " + date.substring(0, 19));
//         //fs.appendFile('log.txt', "-----------------------");
//       }
//     }else{
//       console.log('Error occurred');
//     }
//   });




break;

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


//grabing movies information from omdb


	//var queryURL = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=40e9cece";
  		
  		//console.log(queryURL);


	//request(queryURL, function(error, response, body) {


  //if (error){

    //eturn console.log('Error:', error)
 // }
//
  //body = JSON.parse(body)
    
//   console.log("Title: " + body.Title);
//   console.log("Year: " + body.Year);
//   console.log("IMDB Rating: " + body.imdbRating);
//   console.log("Rotten Tomatoes Rating: " + body.Ratings[1].Value)
//   console.log("Country: " + body.Country)
//   console.log("Language: " + body.Language);
//   console.log("Plot :" + body.Plot);
//   console.log("Actor: " + body.Actors)
// });



function menu(selection, query) {
 // 	//fs.appendFile('log.txt',"\n"+selection+" "+query+"\n")
	// switch (selection) {

	// 	// case "my-tweets":
	// 	// 	myTweets();
	// 	// 	break;

	// 	case "spotify-this-song":
	// 		songName(query);
	// 		break;

	// 	case "movie-this":
	// 		movieName(query);
	// 		break;

	// 	// case "do-what-it-says":
	// 	// 	doThis();
	// 		//break;
	}
}

