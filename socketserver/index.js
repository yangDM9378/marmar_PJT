import express from "express";
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
    // 방 입장
    socket.on('joinRoom', (data) => {
        console.log(data);
        socket.join(data.roomName);
        roomName = data.roomName
        socket.emit('joinRoom', data.roomName)
    });
    // 방 나가기
    socket.on('leaveRoom', () => {
        console.log('방 나가기')
        socket.leave(roomName)
    })
    // 문제 시작
    socket.on('startButton', (payload) => {
        console.log(payload)
        io.sockets.in(roomName).emit('startButton', payload)
    })
    // 이전 버튼
    socket.on('prevButton', (num) => {
        console.log('prevButton : ', num)
        io.sockets.in(roomName).emit('prevButton', num)
    })
    // 다음 버튼
    socket.on('nextButton', (num) => {
        console.log('nextButton : ', num)
        io.sockets.in(roomName).emit('nextButton', num)
    })
    // 종료 버튼
    socket.on('endButton', (payload) => {
        console.log('endButton : ', payload)
        io.sockets.in(roomName).emit('endButton', payload)
    })
    // 픽쳐게임 문제 선택
    socket.on('pictureClickAnswer', (data) => {
        console.log('pictureClickAnswer : ', data)
        io.sockets.in(roomName).emit('pictureClickAnswer', data)
    })
})

server.listen(port, function(){
    console.log(`listening on port ${port}`);
})