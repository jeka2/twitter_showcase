const express = require("express");
const router = express.Router();
const Twit = require('twit');
const config = require('../config'); // Twitter Keys

var T = new Twit(config);

router.get('/', function (req, res, next) {
    console.log(req.query)
    // T.get('search/tweets', { q: 'realDonaldTrump', count: 100 }, (err, data, response) => { console.log(data.statuses) })
    res.json("API is working properly")
})

module.exports = router;