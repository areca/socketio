// initializing express
var app = require('express')();

// creating a server using http module and passing our express instance to it
var server = require('http').Server(app);

// attaching the Socket.io instance to our server.
// Socket.io will listen for sockets on this server.
var io = require('socket.io')(server);

// starting our server on port 127.0.0.1:3000
server.listen(3000, function () {
    console.log('Realtime App running on localhost:3000');
});

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

// all the sockets that connect with our server, and log it to
// the console.
io.on('connection', function (socket) {
  console.log('Socket Connected');

  // The socket.emit() function will send a message to all the
  // connected sockets. This event is identified by the name
  // 'welcome'.
  socket.emit('welcome', { message: 'hello real-time world' });

  // The socket.on() function is used to receive an event
  // from the client and perform a callback with the data sent
  // from the client.
  socket.on('thanks', function (data) {
    console.log(data);
  });

  // This will be called once a client disconnects our server.
  socket.on('disconnect', function() {
    console.log('Socket disconnected');
  });
});
