var express = require("express");
var router = express.Router();
const connection = require("../../connection/connection");

router.get('/adminaddmovies', function (req, res) {
    var get_type = "SELECT * FROM theatertype";
    connection.query(get_type, function (err, foundTypes) {
        if (err) {
            throw err;
        } else {
            var get_genres = "SELECT * FROM moviegenre"
            connection.query(get_genres, function (err, foundGenres) {
                if (err) {
                    throw err;
                } else {
                    res.render("admin/adminaddmovies",{Types:foundTypes, genres:foundGenres});
                }
            })

        }
    })
})


router.post("/adminaddmovies", function (req, res) {
    var MovieName = req.body.MovieName;
    var GenretypeID = req.body.GenretypeID;
    var MovieDetail = req.body.MovieDetail;
    var Movielength = req.body.Movielength;
    var Starring = req.body.Starring;
    var MovieRate = req.body.MovieRate;
    var releasedd = req.body.releasedd;
    var outdd = req.body.outdd;
    var releasemm = req.body.releasemm;
    var releaseyy = req.body.releaseyy;
    var outmm = req.body.outmm;
    var outyy = req.body.outyy;
    var Audio = req.body.Audio;
    var MovieImage = req.body.MovieImage;
    
    console.log(MovieImage)
    var sql = "INSERT INTO moviedata (movieName,genreTypeID,movieDetail,movieLenght,starring,rate,ReleaseDay, ReleaseMonth,ReleaseYear,OutDay,OutMonth,OutYear,audio, imageLink) VALUES ('"+MovieName +"', '"+GenretypeID+"', '"+MovieDetail+"', '"+Movielength+"', '"+Starring+"', '"+MovieRate+"', '"+releasedd+"', '"+outdd+"', '"+releasemm+"', '"+releaseyy+"', '"+outmm+"', '"+outyy+"', '"+Audio+"', '"+MovieImage+"')";
    connection.query(sql, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(MovieName);
            console.log("Insert Complete");
            res.redirect("/manageAdmin");
        }
    })
})


module.exports = router;