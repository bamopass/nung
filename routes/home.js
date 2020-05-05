var express = require("express");
var router = express.Router();
const connection = require("../connection/connection");

router.get('/', function (req, res) {
    var getAllMovies = "SELECT movieID,movieName FROM moviedata WHERE DAY(CURDATE()) >= ReleaseDay AND DAY(CURDATE()) <= OutDay LIMIT 20"
    connection.query(getAllMovies, function (err, doneMovies) {
        if (err) {
            throw err;
        } else {
            var getAllBranchs = "SELECT * FROM branch"
            connection.query(getAllBranchs, function (err, doneBranchs) {
                if (err) {
                    throw err;
                } else {
                    var getmovieDetail = "SELECT movieDetail FROM moviedata"
                    connection.query(getmovieDetail, function (err, donemovieDetail) {
                        if (err) {
                            throw err;
                        } else {
                            var getReleaseDay = "SELECT ReleaseDay FROM moviedata"
                            connection.query(getReleaseDay, function (err, doneReleaseDay) {
                                if (err) {
                                    throw err;
                                } else {
                                    var getReleaseMonth  = "SELECT ReleaseMonth FROM moviedata"
                                    connection.query(getReleaseMonth, function (err, doneReleaseMonth) {
                                        if (err) {
                                            throw err;
                                        } else {
                                            var  getReleaseYear = "SELECT ReleaseYear FROM moviedata"
                                            connection.query(getReleaseYear, function (err, doneReleaseYear) {
                                                if (err) {
                                                    throw err;
                                                } else {
                                                    var getOutDay = "SELECT OutDay FROM moviedata"
                                                    connection.query(getOutDay, function (err, doneOutDay) {
                                                        if (err) {
                                                            throw err;
                                                        } else {
                                                            var getOutMonth = "SELECT OutMonth FROM moviedata"
                                                            connection.query(getOutMonth, function (err, donegetOutMonth) {
                                                                if (err) {
                                                                    throw err;
                                                                } else {
                                                                    var getOutYear = "SELECT OutYear FROM moviedata"
                                                                    connection.query(getOutYear, function (err, donegetOutYear) {
                                                                        if (err) {
                                                                            throw err;
                                                                        } else {  
                                                                            res.render("home",{movies:doneMovies,branchs:doneBranchs, 
                                                                                movieDetail:donemovieDetail, 
                                                                                releaseDay:doneReleaseDay,releaseMonth:doneReleaseMonth,releaseYear:doneReleaseYear,
                                                                                outDay:doneOutDay, outMonth:donegetOutMonth, outYear:donegetOutYear
                                                                                
                                                                            });
                                                                            
                                                                        }
                                                                    })
                                                                }
                                                            })
                                                         }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                    
                }
            })
        }
    })
})


router.post("/searchMovies", function (req, res) {
    console.log('asd');
    // var movie = req.body.SearchMovie;
    // var branch = req.body.SearchBranch;
    var moviename = req.body.moviename
    var sql_search = 'SELECT * FROM moviedata WHERE movieID';
    connection.query(sql_search, function (err, result) {
        if (err) {
            throw err;
        } else {
            res.render("time",{
                movies:result
            });
        }
    })
})

module.exports = router;