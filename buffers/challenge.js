// 0100 1000 0110 1001 0010 0001

//  0100 1000 - 1byte, 0110 1001- 2byte, 0010 0001 - 3byte

const { Buffer } = require("buffer");

// allocate a memory for the buffer and fill each element(one byte) with 0
memoryContainer = Buffer.alloc(3, 0);

memoryContainer[0] = 0x48;
memoryContainer[1] = 0x69;
memoryContainer[2] = 0x21;

console.log(memoryContainer.toString("utf-8")); // Hi!
