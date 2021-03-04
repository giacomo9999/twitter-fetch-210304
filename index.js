require("dotenv").config();

const Twit = require("twit");
const notifier = require("node-notifier");
const open = require("open");
const franc = require("franc");

const apikey = process.env.API_KEY;
const apiSecretKey = process.env.API_SECRET_KEY;
const accessToken = process.env.ACCESS_TOKEN;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

var T = new Twit({
  consumer_key: apikey,
  consumer_secret: apiSecretKey,
  access_token: accessToken,
  access_token_secret: accessTokenSecret,
});

// using older Promise syntax:
// T.get("search/tweets", {
//   q: "ErikLoomis since:2021-3-3",
//   count: 5,
// }).then((res, err) => console.log(res.data.statuses));

// using async:
(async () => {
  T.get(
    "search/tweets",
    {
      q: "ErikLoomis since:2021-3-3",
      count: 5,
    },
    (err, data, response) => {
      console.log(data.statuses);
    }
  );
})();

// (async () => {
// //1. GET RECENT TWEETS
// T.get(
//   "search/tweets",
//   { q: "@ErikLoomis since:2021-3-3", count: 5 },
//   function (err, data, response) {
//     const tweets = data.statuses
//       // .map(tweet => `LANG: ${franc(tweet.text)} : ${tweet.text}`) //CHECK LANGUAGE
//       .map((tweet) => tweet.text)
//       .filter((tweet) => tweet.toLowerCase().includes("elon"));
//     console.log(tweets);
//     console.log(data.statuses);
//   }
// );

// //2. REAL TIME MONITORING USING STREAM (HASHTAG)
// var stream = T.stream("statuses/filter", { track: "#tesla" });
// stream.on("tweet", function (tweet) {
//   console.log(tweet.text);
//   console.log("Language: " + franc(tweet.text));
//   console.log("------");
// });

// 3. REAL TIME MONITORING USING STREAM (LOCATION)
// var sanFrancisco = ["-122.75", "36.8", "-121.75", "37.8"];
// var stream = T.stream("statuses/filter", { locations: sanFrancisco });

//SHOW NOTIFICATION FOR EACH RECEIVED TWEET
// stream.on("tweet", function (tweet) {
//   console.log(tweet.text);
//   let url = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;

//   notifier.notify({
//     title: tweet.user.name,
//     message: tweet.text,
//   });

//   notifier.on("click", async function (notifierObject, options, event) {
//     console.log("clicked");
//     await open(url);
//   });
// });
// })();
