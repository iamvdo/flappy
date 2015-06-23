var socket = io.connect(window.location.origin);
socket.on('position', function (data) {
  console.log('new data index', data);
});