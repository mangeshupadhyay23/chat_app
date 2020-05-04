const socket=io("http://localhost:9000");
const socket2=io("http://localhost:9000/jobs");

    

socket.on('messageFromServer',(datafromServer)=>{
    console.log(datafromServer);
    socket.emit('dataToServer',{data:"Data from Client!"})
})


socket.on('joined',(msg)=>{
    console.log(msg);
})

socket2.on('welcome',(datafromServer)=>{
    console.log(datafromServer);
})

document.getElementById('message-form').addEventListener('submit',(event)=>{
    event.preventDefault();
    const newMessage = document.getElementById('user-message').value;
    socket.emit('newMessageToServer',{text:newMessage});
})


