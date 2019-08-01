// Express server that hosts MySQL DB information in JSON format that will be fetched from App.js

const express = require('express');
const mysql = require('mysql');

/*
You can't use server-side modules (like fs, net, etc) in a browser. Therefore, a server on the side is required to accomplish this.
*/
const connection = mysql.createConnection({
  host: "urlstorage.cuujnc1vkyie.us-west-1.rds.amazonaws.com",
  user: "darren",
  password: "charityfuntila",
  database: "urlstorage"
});

const app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);

app.get('/urls', function (req, res) {
    let sql = `SELECT * FROM listurls`;
    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        results = JSON.stringify(results);
        res.send(results);
    });

});

// Start the server
app.listen(3005, () => {
 console.log('Go to http://localhost:3005/urls to see urls');
});