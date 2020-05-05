var express = require("express");
var router = express.Router();
const connection = require("../../connection/connection");

//handling user sign in กดlogin check db 
router.post("/welcomeadmin", function (req, res) {
    console.log('asd');
    var email = req.body.email;
    var password = req.body.pass;
    if (email && password) {
        connection.query('SELECT * FROM Employee WHERE email = ? AND password = ?', [email, password], function (error, results, fields) {
            if (results.length > 0) {
                req.session.adminEmail = email;
                res.redirect("/manageAdmin");
            } else {
                res.render("admin/welcomeadmin",{error:1});
            }
            res.end();
        });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
});

//logout routes
router.get("/adminLogout", function (req, res) {
    req.session.destroy();
    res.redirect("/welcomeadmin");
});

router.get('/adminregis', function (req, res) {
    var sqlPosition = 'SELECT * FROM Position';
    connection.query(sqlPosition, function (err, resultPosition) {
        if (err) {
            throw err;
        } else {
            var sqlBranch = 'SELECT * FROM Branch';
            connection.query(sqlBranch, function (err, resultBranch) {
                if (err) {
                    throw err;
                } else {
                    console.log(resultPosition);
                    res.render("admin/adminregis",{
                        positions:resultPosition,
                        branchs:resultBranch
                    });
                }
            })
        }
    })
})

router.post("/adminregis", function (req, res) {
    var branchID = req.body.branch;
    var positionID = req.body.position;
    var gender = req.body.gender;
    var citizen_id= req.body.citizen_id;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;
    var phone = req.body.phonenumber;
    var DOBDay = req.body.DOBDay;
    var DOBMonth = req.body.DOBMonth;
    var DOBYear = req.body.DOBYear;

    var sql = "INSERT INTO Employee(branchID,positionID,gender,citizen,fName,LName,email,password,phoneNo,dd,mm,yyyy) values ('" + branchID + "','" + positionID + "','" + gender + "','" + citizen_id + "','" + firstname + "','" + lastname + "','" + email + "','" + password + "','" + phone + "','" + DOBDay + "','" + DOBMonth + "','" + DOBYear + "')";
    connection.query(sql, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log("Insert Complete");
            req.session.adminEmail = email;
            res.redirect("/manageAdmin");
        }
    })
})



module.exports = router;