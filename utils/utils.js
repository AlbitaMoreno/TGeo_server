/**
 * utils.js
 * @description Archivo usado para declaración de constantes usadas en el servidor
 * @author Alba Moreno Ontiveros
 * @date 2021
 */
const URL = {
  LOOK_OUT_TWEETS: "https://api.twitter.com/2/tweets?ids=",
  SEARCH_RECENT_TWEETS: "https://api.twitter.com/2/tweets/search/recent",
};
const USER_AGENT = {
  LOOK_OUT_TWEETS: "v2TweetLookupJS",
  SEARCH_RECENT_TWEETS: "v2RecentSearchJS",
};
module.exports = {
  URL,
  USER_AGENT,
};
