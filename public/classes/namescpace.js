class Namespace {
  constructor(id, nsTitle, img, endpoint) {
    this.id = id;
    this.nsTitle = nsTitle;
    this.img = img;
    this.endpoint = endpoint;
  }

  addRoom(roomObj) {
    this.room.push(roomObj);
  }
}

module.exports = Namespace;
