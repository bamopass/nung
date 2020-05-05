var express = require("express");
var mysql = require('mysql');
 
var connection = mysql.createConnection({
    host:"localhost",
    user : 'root',
    password : '',
    database : 're'
    });
 
    connection.connect(function(err){
        if(err){
        console.log("pls check your DB");
        throw err;
        }else{
        console.log("Connected DB");
        }
    });
 
 module.exports = connection;