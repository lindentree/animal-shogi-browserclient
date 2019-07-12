const express = require('express');
const bodyParser = require('body-parser');
const shrinkRay = require('shrink-ray-current');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
//var users = require('../database-mongo');

const app = express();

// UNCOMMENT FOR REACT
app.use(shrinkRay());
app.use('/', express.static(__dirname + '/../dist'));


// app.get('/users', function (req, res) {
//   users.selectAll(function(err, data) {
//     if(err) {
//       res.sendStatus(500);
//     } else {
//       res.json(data);
//     }
//   });
// });

// app.post('/create', function (req, res) {
//   req.data
// });

// app.patch('/update', function (req, res) {
  
// });

app.listen(process.env.PORT || 3004, function() {
  console.log('listening on port 3004!');
});

