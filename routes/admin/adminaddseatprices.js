var express = require("express");
var router = express.Router();
const connection = require("../../connection/connection");

router.get('/adminaddseatprices', function (req, res) {
    var get_branch = "SELECT * FROM branch";
    connection.query(get_branch, function (err, foundBranch) {
        if (err) {
            throw err;
        } else {
            var get_theatertypes = "SELECT * FROM theatertype"
            connection.query(get_theatertypes, function (err, foundtheatertype) {
                if (err) {
                    throw err;
                } else {
                    res.render("admin/adminaddseatprices", {Branches:foundBranch, Theatertypes:foundtheatertype,success:0});      
                }
            })
        }
    })
})




router.post('/adminaddseatprices', function (req, res) {
    var Branch = req.body.Branch;
    var TheathertypeID = req.body.TheathertypeID;

    console.log(Branch);
    console.log(TheathertypeID);
   
    var get_branch = "SELECT branchID,branchName FROM branch  WHERE branchID = '"+Branch+"'";
    connection.query(get_branch, function (err, foundBranch) {
        if (err) {
            throw err;
        } else {
            var get_theatertypes = "SELECT theaterTypeID,TheaterTypeName FROM theatertype WHERE theaterTypeID = '"+TheathertypeID+"'"
            connection.query(get_theatertypes, function (err, foundtheatertype) {
                if (err) {
                    throw err;
                } else {          
                    var get_TheatherID = "SELECT theaterID,theaterNo FROM theater WHERE branchID = '"+Branch+"' AND theaterTypeID = '"+TheathertypeID+"' "
                    connection.query(get_TheatherID, function (err, foundTheatherID){
                        if (err) {
                            throw err;
                        } else {         
                            var get_seattype = "SELECT * FROM seat_type"
                            connection.query(get_seattype, function (err, foundseattype){
                                if (err) {
                                    throw err;
                                } else {
                                    var get_seatrow = "SELECT * FROM seat_row"
                                    connection.query(get_seatrow, function (err, foundseatrow){
                                        if (err) {
                                            throw err;
                                        } else {
                                            console.log(foundBranch[0]);     
                                            res.render("admin/adminaddseatprice2", {
                                                branchName:foundBranch[0],
                                                TheaterTypeName:foundtheatertype[0],
                                                theaterIDs:foundTheatherID, 
                                                Seattypes:foundseattype, 
                                                Seatrows:foundseatrow
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
})

router.post("/adminaddseatprices2/:branchID/:theaterTypeID", function (req, res) {
    var Branch = req.params.branchID;
    var TheathertypeID = req.params.theaterTypeID;
    var theater_ID = req.body.theater_no;
    var Seattypes = req.body.Seattypes;
    var seat_no = req.body.seat_no;
    var Seatprice = req.body.seatPrice;

    var sql_seat = "INSERT INTO seat (seatNumber, seatType,theaterID,price ) VALUES ('"+seat_no+"', '"+Seattypes+"', '"+theater_ID+"', '"+Seatprice+"')";
    connection.query(sql_seat, function (err, result1) {
        if (err) {
            throw err;
        } else {
            var Name = req.body.Name;
            var sql_row = "INSERT INTO seat_row(name) VALUES ('"+Name+"')";
            console.log('insert complete');
            res.redirect("/manageAdmin");
        }
    })
})


module.exports = router;