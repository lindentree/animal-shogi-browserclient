const express = require('express');
const bodyParser = require('body-parser');
const shrinkRay = require('shrink-ray-current');

const app = express();

app.use(shrinkRay());
app.use('/', express.static(__dirname + '/../dist'));

app.listen(process.env.PORT || 3004, function() {
  console.log('listening on port 3004!');
});

