import express from "express";
import path from "path";
import { Server } from "socket.io";
import http from "http";

const app = express();
const port = 4000;
const server = http.createServer(app);
const io = new Server(server, {
    cors : {
        origin :"*",
        credentials :true
    }
});


// 연결 시작
io.on('connection', socket=>{
    let roomName = ''

    socket.onAny((event) => {
        console.log(`Socket event: ${event}`);
    });
    socket.on('joinRoom', (data) => {
        console.log(data);
        socket.join(data.roomName);
        roomName = data.roomName
        socket.emit('joinRoom', data.roomName)
    });
    socket.on('startButton', (payload) => {
        console.log(payload)
        io.sockets.in(roomName).emit('startButton', payload)
    })
    
    socket.on('message',(num) => {
        console.log(num)
        io.sockets.in(roomName).emit('message',(num))
    });
    socket.on('nextclick', function(data) {
        console.log("data"+data);
        io.sockets.in(roomName).emit('nextclick_2',(data))
    });
    socket.on('preclicke', function(data) {
        console.log("data"+data);
        io.sockets.in(roomName).emit('preclicke_2',(data))
    });
    
})

server.listen(port, function(){
    console.log(`listening on port ${port}`);
})