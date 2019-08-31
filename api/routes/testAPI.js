const express = require("express");
const router = express.Router();
const Twit = require('twit');
const config = require('../config'); // Twitter Keys

var T = new Twit(config);

router.get('/', function (req, res, next) {
    T.get('search/tweets', { q: 'realDonaldTrump', count: 100 }, (err, data, response) => { console.log(data.statuses) })
    res.send("API is working properly")
})

module.exports = router;