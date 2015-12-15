
$(document).ready(function () {
console.log('hello script');


  var socket = new io();
    socket.connect('http://localhost:3000', {
    autoConnect: true
  });

  var btn = $('#btn').click(function(){
    console.log('click');
    socket.send('hello from the frontend');
  });
});