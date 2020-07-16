'use strict';

console.log('Chat Server');
console.log('Copyright (C) 2020 Ercan Ersoy (https://ercanersoy.net)');
console.log('This software has licensed MIT License.');
console.log();

let express = require('express');
let http = require('http');
let socket_io = require('socket.io');

let app = express();
let http_server = http.createServer(app);
let io = socket_io(http_server);

app.get('/', (request, response) => {
    console.log('HTTP page has been requested.');
    response.sendFile(__dirname + '/client/index.html');
});

io.on('connection', (socket) => {
    console.log('A connection has been established.');

    socket.on('chat message', function(message) {
        io.emit('chat message', message);
        console.log(message);
        socket.emit('messages', message);
    });
});

http_server.listen(8080);
