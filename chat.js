const express = require("express");
const app = express();
const socketio = require("socket.io");

let namespaces = require("./public/data/namespaces");
// console.log(namespaces);

app.use(express.static("./public"));

const expressServer = app.listen(9000);
const io = socketio(expressServer); // io is server and io.(anything ) then anything is socket i.e server.socket

io.on("connection", (socket) => {
  console.log(socket.handshake);
  // build an array to pass down images and endpoint for each Namespace
  let nsData = namespaces.map((ns) => {
    return {
      img: ns.img,
      endpoint: ns.endpoint,
    };
  });
  // console.log(nsData);
  // send nsData back to the client to show namespace and rooms
  // we will use socket not io cause this info has to be send only to one socket not
  // to all the sockets using server or io
  socket.emit("nsList", nsData);
});

//loop through all on namespaces and search for connection that which one is user connected with

namespaces.forEach((namespace) => {
  io.of(namespace.endpoint).on("connection", (nsSocket) => {
    const username = nsSocket.handshake.query.username;
    const avatar = nsSocket.handshake.query.avatar;
    // console.log(`${nsSocket.id} has joined ${namespace.endpoint}`);
    // when this happens it means namespace has been connected an the info of that namespace
    // will be sent to client
    nsSocket.emit("nsRoomLoad", namespace.rooms);
    nsSocket.on("joinRoom", (roomName, callbackToGetNumberOfUsers) => {
      // console.log(roomName);
      // we will take the name of old room every time and leave it before joining the room
      // if new and old both room are same still there wont be a problem u will stay in the same room
      const roomToBeLeft = Object.keys(nsSocket.rooms)[1];
      nsSocket.leave(roomToBeLeft);
      updateNumberOfUserInRoom(namespace, roomToBeLeft); //users will be updated after leaving a room everytime
      nsSocket.join(roomName);

      // io.of("/wiki")
      //   .in(roomName)
      //   .clients((error, clients) => {
      //     console.log(clients.length);
      //     callbackToGetNumberOfUsers(clients.length);
      //   });
      const nsRoom = namespace.rooms.find((room) => {
        return room.roomTitle === roomName;
      });

      // console.log(namespace.rooms);

      // console.log(nsRoom);
      // console.log(nsRoom.history);
      nsSocket.emit("historyCatchUp", nsRoom.history);

      updateNumberOfUserInRoom(namespace, roomName); // users will be update after joining as well
    });
    nsSocket.on("newMessageToServer", (msg) => {
      const msgFormat = {
        text: msg.text,
        time: Date.now(),
        username: username,
        avatar: avatar,
      };

      console.log(msgFormat);
      //nsSocekt.rooms gives an object containing socketID connected with namespace and name or room inside the namespace
      // but it isnt in the form of an array so we have to extract the keys of the object so we use Object.keys fucntion which gives u an array of all the keys present inside socket.rooms
      const roomTitle = Object.keys(nsSocket.rooms)[1];
      const nsRoom = namespace.rooms.find((room) => {
        return room.roomTitle === roomTitle;
      });
      console.log(roomTitle);
      // console.log(nsSocket);
      console.log("the room we wanted matches this rooms title");
      console.log(namespace.rooms[0].roomTitle);
      console.log(nsRoom);
      nsRoom.addMessage(msgFormat);

      io.of(namespace.endpoint)
        .to(roomTitle)
        .emit("messageToClients", msgFormat);
    });
  });
});

function updateNumberOfUserInRoom(namespace, roomName) {
  io.of(namespace.endpoint)
    .in(roomName)
    .clients((error, clients) => {
      // console.log(`there are ${clients.length} in this room`);
      io.of(namespace.endpoint)
        .in(roomName)
        .emit("updateMembers", clients.length);
    });
}
