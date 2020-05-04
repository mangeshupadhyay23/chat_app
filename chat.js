const express= require('express');
const app= express();
const socketio=require('socket.io');

app.use(express.static('./public'));

const expressServer=app.listen(9000);
const io=socketio(expressServer);    // io is server and io.(anything ) then anything is socket i.e server.socket


io.on('connection',(socket)=>{
    socket.emit('messageFromServer',{data:"Welcome to the socketio server"});
    socket.on('dataToServer',(dataFromClient)=>{
        console.log(dataFromClient)
    })

    socket.join('level1');
    io.of('/').to('level1').emit("joined",`${socket.id}I have joined level 1 room`)

})



io.of('/jobs').on('connection',(socket)=>{
    console.log("someone Connected with admin")
    io.of('/jobs').emit('welcome','welcome to jobs namespace')
    io.of('/jobs').emit('welcome',"WELCOME TO THE JOBS CHANNEL")
})