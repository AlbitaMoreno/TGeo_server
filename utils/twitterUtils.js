const needle = require('needle');
const dotenv = require('dotenv');
const { URL, USER_AGENT } = require('./utils');

dotenv.config();

const token = process.env.BEARER_TOKEN;

async function queryTweets(params) {
    const res = await needle('get', URL.SEARCH_RECENT_TWEETS, params, {
        headers: {
            "User-Agent": USER_AGENT.SEARCH_RECENT_TWEETS,
            "authorization": `Bearer ${token}`
        }
    });

    if (res.body) {
        return res.body;
    }
}

async function getRequest(params) {
    const res = await needle('get', URL.LOOK_OUT_TWEETS, params, {
        headers: {
            "User-Agent": USER_AGENT.LOOK_OUT_TWEETS,
            "authorization": `Bearer ${token}`
        }
    });

    if (res.body) {
        return res.body;
    }
}

module.exports = {
    getRequest,
    queryTweets
};