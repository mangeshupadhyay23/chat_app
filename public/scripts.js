const socket = io("http://localhost:9000");
let nsSocket = ""; //to declare it as global variable
// const socket2 = io("http://localhost:9000/wiki");
// const socket3 = io("http://localhost:9000/mozilla");
// const socket4 = io("http://localhost:9000/linux");

socket.on("nsList", (nsData) => {
  // console.log("THE LIST OF NAMESPACES ARRIVED");
  // console.log(nsData);
  let namsepacesDiv = document.querySelector(".namespaces");
  namsepacesDiv.innerHTML = "";
  nsData.forEach((ns) => {
    namsepacesDiv.innerHTML += `<div class="namespace" ns=${ns.endpoint}><img src=${ns.img} /></div>`;
  });

  //onClick listener for each namespace
  // but document.getElementByClassName does not gives an array it gives a set of html data
  // but we can use ES6 for converting it in array
  // console.log(document.getElementsByClassName("namespace"));
  // console.log( Array(document.getElementsByClassName("namespace")));

  Array.from(document.getElementsByClassName("namespace")).forEach((elem) => {
    // console.log(elem);
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      // you will move to given namespace endpoint
      const nsEndpoint = elem.getAttribute("ns");
      // console.log(`i want to move to ${nsEndpoint}`);
      joiningNamespace(nsEndpoint);
    });
  });
});

// socket.on("connect", () => {
//   // console.log(socket.id);
// });

// socket.on("messageFromServer", (datafromServer) => {
//   console.log(datafromServer);
//   socket.emit("dataToServer", { data: "Data from Client!" });
// });
