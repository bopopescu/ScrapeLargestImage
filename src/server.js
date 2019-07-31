const express = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "urlstorage.cuujnc1vkyie.us-west-1.rds.amazonaws.com",
  user: "darren",
  password: "charityfuntila",
  database: "urlstorage"
});



const app = express();

// connection.connect(function(err) {
//   if (err){
//     console.log('err', err)
//   } 
//   else{
//     console.log("Connected!");
//     let sql = `SELECT * FROM URLTable`;
//     connection.query(sql, function (err, result) {
//       if (err) throw err;
//     //   console.log(result[0].link);
//     result = JSON.stringify(result)
//     console.log(result)
//     connection.end()
//     });
//   }
// });



var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);


app.get('/urls', function (req, res) {
    // connection.connect();
    let sql = `SELECT * FROM urlstore`;
    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        results = JSON.stringify(results);
        res.send(results);
    });

    // connection.end();
});

// Start the server
app.listen(3003, () => {
 console.log('Go to http://localhost:3003/urls to see urls');
});