var path = require('path');

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.use('/', require('./routes/index'));

server.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

io.on('connection', function (socket) {
  socket.on('position', function (data) {
    data.sender = socket.id;
    data.clones = io.engine.clientsCount;
    socket.broadcast.emit('position', data);
  });
});