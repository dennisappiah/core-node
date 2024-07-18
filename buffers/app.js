// with buffers, we can work with binary data

const { Buffer } = require("buffer");

// allocate 4 bytes (32 bits) memory -> it initializes all elements with 0 first
const memoryContainer = Buffer.alloc(4);

// writing hex data into 4 elements of the buffer
memoryContainer[0] = 0xf4;
memoryContainer[1] = 0x32;
//writing negative hex at position 2
memoryContainer.writeInt8(-34, 2);
memoryContainer[3] = 0xff;

console.log(memoryContainer[0]);
console.log(memoryContainer[1]);
console.log(memoryContainer.readInt8(2));
console.log(memoryContainer[3]);

console.log(memoryContainer.toString("hex"));
