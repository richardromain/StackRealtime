var server = require('http').createServer();
var io = require('socket.io')(server);

server.listen(9000);

var redis = require('redis');
var redisClient = redis.createClient({
    host: '192.168.99.100'
});

redisClient.on('message', function (channel, message) {
    message = JSON.parse(message);
    console.log(message.event);
    io.sockets.emit(message.event, JSON.stringify(message.data));
});

redisClient.subscribe('api');

console.log('Listening on port 9000...');