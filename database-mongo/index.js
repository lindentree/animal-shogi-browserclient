var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var userSchema = mongoose.Schema({
  name: String,
  wins: Number,
  losses: Number
});

var User = mongoose.model('User', userSchema);


var updateUser = function(name, update, callback) {
  User.find({'name': name}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      user[update]++;
      callback(null, items);
    }
  });
};

var createUser = function(name, update, callback) {
  User.find({'name': name}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      user[update]++;
      callback(null, items);
    }
  });
};

var selectAll = function(callback) {
  User.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports.selectAll = selectAll;