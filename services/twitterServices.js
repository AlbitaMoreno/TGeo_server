const utils = require("../utils/twitterUtils");
const Sentiment = require("sentiment");

const sentiment = new Sentiment();
const fs = require("fs");

async function _tweetsLookOut(tweetsIdList) {
  const params = {
    ids: tweetsIdList, // Edit Tweet IDs to look up
    expansions: "geo.place_id,author_id",
    "place.fields": "country,geo,name,country_code",
    "tweet.fields": "lang,author_id,geo", // Edit optional query parameters here
    "user.fields": "created_at", // Edit optional query parameters here
  };
  const response = await utils.getRequest(params);
  return response;
}

function _getTweetsIdList(tweetList) {
  let result = "";
  for (const [index, tweet] of tweetList.entries()) {
    index == 0 ? (result += tweet.id) : (result += "," + tweet.id);
  }
  return result;
}

/**
 *
 * @param {query: {key_words}} req, contiene la busqueda a realizar
 * @returns array de objetos, donde cada objeto consta de una propiedad tweet
 * y score. Tweet contiene toda la información obtenida por parte de la API de Twitter
 * mientras que score contiene resultado para ese tweet que ha obtenido la biblioteca
 * sentiment.js
 */
async function getTweets(req) {
  const keyWords = `("${req.query.key_words}")`;
  const params = {
    query: keyWords,
    expansions:
      "author_id,geo.place_id,in_reply_to_user_id,referenced_tweets.id,referenced_tweets.id.author_id",
    "tweet.fields":
      "author_id,created_at,geo,id,in_reply_to_user_id,lang,referenced_tweets,source,text",
    "place.fields":
      "contained_within,country,country_code,full_name,geo,id,name,place_type",
    max_results: 10,
  };
  const response = await utils.queryTweets(params);
  analyzeSentiment(tweetLookOutList.data);
  return response;
}

function analyzeSentiment(list) {
  const result = [];
  for (const iterator of list) {
    const tweet = {
      tweet: iterator,
      score: sentiment.analyze(iterator.text),
    };
    result.push(tweet);
  }
  return result;
}

function getSentimentMeanFromFile() {
  let object = fs.readFileSync("./data/geolocation.json", "utf8");
  object = JSON.parse(object);
  return analyzeSentiment(object.data);

  // for (const item of object) {
  //   if (item.sentiment.score > max) max = item.sentiment.score;
  //   mean += item.sentiment.score;
  // }
  // mean = mean ? (mean = mean / object.length) : mean;

  // return mean / max;
}

module.exports = {
  getTweets,
  getSentimentMeanFromFile,
};
