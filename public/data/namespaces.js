// Bring in the room class
const Namespace = require("../classes/namescpace");
const Room = require("../classes/room");

// Set up the namespaces
let namespaces = [];
let familyNs = new Namespace(
  0,
  "Family",
  "https://i.ibb.co/SRh4sgk/family.png",
  "/family"
);
let acadNs = new Namespace(
  1,
  "Academics",
  "https://i.ibb.co/1rjsyxj/online.png",
  "/academics"
);
let friendsNs = new Namespace(
  2,
  "Friends",
  "https://i.ibb.co/m9HwRj9/miscellaneous.png",
  "/friends"
);

// Make the main room and add it to rooms. it will ALWAYS be 0
familyNs.addRoom(new Room(0, "Mummy", "Family"));
familyNs.addRoom(new Room(1, "Papa", "Family"));
familyNs.addRoom(new Room(2, "Didi", "Family"));

acadNs.addRoom(new Room(0, "Physics", "Academics"));
acadNs.addRoom(new Room(1, "Chemistry", "Academics"));
acadNs.addRoom(new Room(2, "Maths", "Academics"));
acadNs.addRoom(new Room(3, "DC", "Academics"));

friendsNs.addRoom(new Room(0, "Hardik", "Friends"));
friendsNs.addRoom(new Room(1, "Netflix", "Friends"));
friendsNs.addRoom(new Room(2, "Bharat", "Friends"));
friendsNs.addRoom(new Room(3, "Harsh", "Friends"));

namespaces.push(familyNs, acadNs, friendsNs);

module.exports = namespaces;
