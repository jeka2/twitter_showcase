const express = require("express");
const router = express.Router();
const Twit = require('twit');
const config = require('../config'); // Twitter Keys

var T = new Twit(config);
tweetCounter = {};

router.get('/', function (req, res, next) {
    const type = req.query.type;
    const value = req.query.value;
    if (type === 'User') {
        T.get('statuses/user_timeline', { screen_name: `${value}`, count: 5, tweet_mode: "extended" }, (err, data, response) => {
            if (!err) { res.json(data); }
            else { res.json({ 'error': 'user doesn\'t exist' }) }
        }
        )
    }
    else if (type === "Tweet") {
        T.get('search/tweets', { q: `${value}`, count: 5, tweet_mode: "extended", display_text_range: [0, 280] }, (err, data, response) => {
            if (!err) { res.json(data.statuses) }
            else { res.json({ 'error': 'something went wrong' }) }
        }
        )
    }
})

router.get('/getUserInfo', function (req, res, next) {
    const screenName = req.query.name;
    T.get('statuses/user_timeline', { screen_name: `${screenName}`, tweet_mode: "extended" }, (err, data, response) => {
        if (!err) {
            const randomTweetIndex = Math.floor(Math.random() * data.length);
            res.json(data[randomTweetIndex]);

        }
        else { res.json({ 'error': 'user doesn\'t exist' }) }
    }
    )
})

router.get('/randomTweetReset', function (req, res, next) {
    tweetCounter = {};
    res.sendStatus(200);
})

router.get('/getRandomTweet', function (req, res, next) {
    const screenName = req.query.name;

    T.get('statuses/user_timeline', { screen_name: `${screenName}`, tweet_mode: "extended" }, (err, data, response) => {
        if (!err) {
            const numberOfTweets = data.length;
            // Makes sure displayed tweets are unique
            if (!tweetCounter[screenName] || tweetCounter[screenName].length === 0) { setIndeces(screenName, numberOfTweets) }

            const index = tweetCounter[screenName].pop();
            res.json(data[index]);
        }
        else { res.json({ 'error': 'user doesn\'t exist' }) }
    })
})

function setIndeces(screenName, numberOfTweets) {
    let indexArr = [];
    for (let i = 0; i < numberOfTweets; i++) {
        indexArr.push(i);
    }
    for (let j = indexArr.length - 1; j > 0; j--) {
        const rand = Math.floor(Math.random() * j);
        const temp = indexArr[j];
        indexArr[j] = indexArr[rand];
        indexArr[rand] = temp;
    }
    tweetCounter[screenName] = indexArr;
}

module.exports = router;