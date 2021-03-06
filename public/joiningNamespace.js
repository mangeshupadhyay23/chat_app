function joiningNamespace(endpoint) {
  if (nsSocket) {
    // check to see if its not closed
    nsSocket.close();
    document
      .querySelector("#user-input")
      .removeEventListener("submit", submissionHandler);
  }
  nsSocket = io(`http://localhost:9000${endpoint}`);
  console.log(`${endpoint}`);
  nsSocket.on("nsRoomLoad", (nsRooms) => {
    // console.log(nsRooms);
    let roomList = document.querySelector(".room-list");
    roomList.innerHTML = "";
    nsRooms.forEach((room) => {
      let glyph;
      if (room.privateRoom) {
        glyph = "lock";
      } else {
        glyph = "globe";
      }
      roomList.innerHTML += `<li class='room'>
     <img src="https://i.ibb.co/R92wPDM/icons8-user-24.png" alt="user_icon">${room.roomTitle}
  </li>`;
    });
    //clicklistener
    let roomNodes = document.getElementsByClassName("room");
    Array.from(roomNodes).forEach((elem) => {
      elem.addEventListener("click", (e) => {
        // console.log("Someone clicked me", e.target.innerText);
        joinRoom(e.target.innerText);
      });
    });
    //automatically enter into the room when join a namespace
    const topRoom = document.querySelector(".room"); // queryselector automatically finds first element with given tag
    const topRoomName = topRoom.innerText;

    joinRoom(topRoomName);
  });

  nsSocket.on("messageToClients", (msg) => {
    console.log(msg);
    const newMsg = messgaeFormat(msg);
    document.querySelector("#messages").innerHTML += newMsg;
  });

  document
    .querySelector(".message-form")
    .addEventListener("submit", submissionHandler);
}

function submissionHandler(event) {
  event.preventDefault();
  const newMessage = document.getElementById("user-message").value;
  nsSocket.emit("newMessageToServer", { text: newMessage });
}

function messgaeFormat(msg) {
  const covertedDate = new Date(msg.time).toLocaleString();
  const msgFormat = `
  <li>
    <div class="user-image">
      <img src=${msg.avatar} />
    </div>
    <div class="user-message">
      <div class="user-name-time">${msg.username}  <span>${covertedDate}</span></div>
      <div class="message-text">${msg.text}</div>
    </div>
</li>`;

  return msgFormat;
}
