function joinRoom(roomName) {
  nsSocket.emit("joinRoom", roomName, (numberOfUser) => {});

  nsSocket.on("messageHistory", (history) => {
    const messagesUI = document.querySelector("#messages");
    messagesUI.innerHTML = "";
    history.forEach((msg) => {
      const newMsg = messgaeFormat(msg);
      const currentMessages = messagesUI.innerHTML;
      messagesUI.innerHTML = currentMessages + newMsg;
    });
    messagesUI.scrollto(0, messagesUI.scrollHeight);
  });

  nsSocket.on("updateMembers", (numMembers) => {
    document.querySelector(
      ".curr-room-num-users"
    ).innerHTML = `${numMembers} <span class="glyphicon glyphicon-user"></span
        >`;
  });
}
