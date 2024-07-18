// define emitter class
const EventEmitter = require("events");

class Emitter extends EventEmitter {}

const myEv = new Emitter();

// raise event called "foo"
myEv.on("foo", () => {
  console.log("An event occurred 1");
});

myEv.on("foo", () => {
  console.log("An event occurred 2");
});

myEv.on("foo", (x) => {
  console.log("An event with parameter has occurred");
  console.log(x);
});

// CPU responds to event "foo"
myEv.emit("foo");
myEv.emit("foo", "some text");
