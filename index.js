var express = require('express');
var http = require('http');
var path = require('path');
var Twit = require('twit');
var fs = require('fs');
var io = require('socket.io');
var app = express(); // create the app
var server = http.createServer(app);
var socket = io.listen(server);
var port = 3000;

app.use(express.static(path.join(__dirname, '/public')));
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

var T = new Twit({
  consumer_key:'',
  consumer_secret:'',
   access_token: '',
   access_token_secret:''
})

var counter = 0;
var results = [];

  socket.on('connection', function(client) {
    // log what the client is sending
    client.on('message', function(message) {
      console.log(message);
    });

    });
var timer = setInterval(function() {
  T.get('search/tweets', {
    q: 'hund',
    geocode: ['52', '13', '100km'],
    count: 100
  }, function(err, data, response) {
    console.log(data);
    results.push(data);
    counter++;

    if (counter == 2) {
      fs.writeFile('public/cache/data.json', JSON.stringify(results), 'utf8', function(err, data) {
        if (err) {
          throw err;
        } else {
          console.log('wrote file');
          clearInterval(timer);
        }

      });
    }
  });

}, 500);

server.listen(port, function() {
  console.log('Express server listening on port ' + port);
});