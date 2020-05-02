const express= require('express');
const app= express();
const socketio=require('socket.io');

app.use(express.static(__dirname + ''));

const expressServer=app.listen(9000);
const io=socketio(expressServer);    // io is server and io.(anything ) then anything is socket i.e server.socket
io.on('connection',(socket)=>{
    socket.emit('messageFromServer',{data:"Welcome to the socketio server"});
    socket.on('dataToServer',(dataFromClient)=>{
        console.log(dataFromClient)
    })
    socket.on('newMessageToServer',(msg)=>{
        // console.log(msg);
        io.emit('messageToClients',{text:msg.text});
    })
})