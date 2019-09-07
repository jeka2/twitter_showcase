const express = require("express");
const router = express.Router();
const Twit = require('twit');
const config = require('../config'); // Twitter Keys

var T = new Twit(config);

router.get('/', function (req, res, next) {
    const type = req.query.type;
    const value = req.query.value;
    if (type === 'User') {
        console.log(value)
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

module.exports = router;