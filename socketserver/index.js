
const app = require('express')()
const server = require('http').createServer(app)
const cors = require('cors')
const io = require('socket.io')(server,{
    cors : {
        origin :"*",
        credentials :true
    }
});


io.on('connection', socket=>{
    socket.on('joinRoom',function (data) {
        console.log(data);
        socket.join(data.roomName);
        roomName = data.roomName;
    });
    socket.on('message',(num) => {
        console.log(num)
        io.sockets.in(roomName).emit('message',(num))
    })
})

server.listen(4000, function(){
    console.log('listening on port 4000');
})