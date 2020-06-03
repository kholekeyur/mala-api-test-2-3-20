// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));

// app.post('/user', (req, res, next) => {
//   res.send('<h1>User: ' + req.body.username + '</h1>');
// });

// app.get('/', (req, res, next) => {
//   res.send(
//     '<form action="/user" method="POST"><input type="text" name="username"><button type="submit">Create User</button></form>'
//   );
// });

// app.listen(5000);


var express = require('express');
var app = express();
var fs = require("fs");

app.get('/listUsers', function (req, res) {
   fs.readFile("./" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})