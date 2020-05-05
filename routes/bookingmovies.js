var express = require("express");
var router = express.Router();
const connection = require("../connection/connection");

router.get('/bookingmovies', function (req, res) {
    res.render("bookingmovies");
    })

module.exports = router;