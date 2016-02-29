
var Twit = require('twit');
var config = require('./config.json'); // <-- could hold your credeintials
var T = new Twit({
  consumer_key: '',
  consumer_secret: '',
  access_token: '',
  access_token_secret: ''
});

T.get('search/tweets', {
  q: 'kitty',
  // geocode: ['52', '13', '100km'],
  count: 100
}, function(err, data, response) {
  console.log(data);
});
