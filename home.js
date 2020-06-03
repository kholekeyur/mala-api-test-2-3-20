
var express = require('express');
var app = express();
var fs = require("fs");

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

 const dataPath = './users.json';


  const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };


 app.get('/', (req, res) => {
        res.send('welcome to the development api-server');
    });



 app.get('/users', (req, res) => {
   fs.readFile(dataPath, 'utf8', (err, data) => {
       if (err) {
           throw err;
       }
       

       res.send(JSON.parse(data));
   });
});


app.get('/users/:id', function (req, res) {
   // First read existing users.
   fs.readFile(dataPath, 'utf8', function (err, data) {
      var users = JSON.parse( data );
      var user = users[req.params.id] 
      console.log( user );
      res.end( JSON.stringify(user));
   });
})


// CREATE
app.post('/users', (req, res) => {

   readFile(data => {
       const newUserId = Object.keys(data).length + 1;

       // add the new usernumbers.find(e => e % 2 == 0)
       data[newUserId.toString()] = req.body;

       writeFile(JSON.stringify(data, null, 2), () => {
           res.status(200).send('new user added');
       });
   },
       true);
});


// UPDATE
app.put('/users/:id', (req, res) => {

   readFile(data => {

       // add the new user
       const userId = req.params["id"];
       data[userId] = req.body;

       writeFile(JSON.stringify(data, null, 2), () => {
           res.status(200).send(`users id:${userId} updated`);
       });
   },
       true);
});


app.delete('/users/:id', (req, res) => {

   readFile(data => {

       // add the new user
       const userId = req.params["id"];
       delete data[userId];

       writeFile(JSON.stringify(data, null, 2), () => {
           res.status(200).send(`users id:${userId} removed`);
       });
   },
       true);
});







const PORT = process.env.PORT || 8081;

var server = app.listen(PORT, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})