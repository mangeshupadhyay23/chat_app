function joinRoom(roomName) {
  nsSocket.emit("joinRoom", roomName, (numberOfUser) => {});

  nsSocket.on("messageHistory", (history) => {
    // console.log(history);
    const messagesUl = document.querySelector("#messages");
    messagesUl.innerHTML = "";
    history.forEach((msg) => {
      const newMsg = messgaeFormat(msg);
      const currrentMessages = messagesUl.innerHTML;
      messagesUl.innerHTML = currrentMessages + newMsg;
    });
    messagesUl.scrollTo(0, messagesUl.scrollHeight);
  });
  nsSocket.on("updateMembers", (numMembers) => {
    document.querySelector(
      ".curr-room-num-users"
    ).innerHTML = `${numMembers}  <span class="glyphicon glyphicon-user"></span></span> `;
    document.querySelector(".curr-room-text").innerHTML = roomName;
  });

  let searchBox = document.querySelector("#search-box");
  searchBox.addEventListener("input", (e) => {
    console.log(e.target.value);
    let messagesArray = Array.from(
      document.getElementsByClassName("message-text")
    );
    console.log(messagesArray);
    messagesArray.forEach((msg) => {
      /// this function gives index of the points where the searchox text matches our message text if it doesnt exist it gives -1
      if (
        msg.innerText.toLowerCase().indexOf(e.target.value.toLowerCase()) === -1
      ) {
        msg.style.backgroundColor = "transparent";
      } else if (e.target.value === "") {
        msg.style.backgroundColor = "transparent";
      } else {
        msg.style.backgroundColor = "#e6e6e6";
      }
    });
  });
}
