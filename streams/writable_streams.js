const fs = require("fs/promises");
const { Buffer } = require("buffer");

// Execution time: 51.777s
// CPU Usage: 100% (one core)
// Memory Usage: 64.55MB

// (async () => {
//   console.time("WriteMany");
//   const fileHandleWrite = await fs.open("text.txt", "w");

//   for (let i = 0; i < 1000000; i++) {
//     await fileHandleWrite.write(` ${i} `);
//   }
//   console.timeEnd("WriteMany");

//   setInterval(() => {
//     const memoryUsage = process.memoryUsage();
//     console.log(
//       `Memory Usage - RSS: ${memoryUsage.rss / (1024 * 1024)} MB, Heap Total: ${
//         memoryUsage.heapTotal / (1024 * 1024)
//       } MB, Heap Used: ${memoryUsage.heapUsed / (1024 * 1024)} MB`
//     );
//   }, 1000);
// })();

// USING STREAMS
// Execution time: 34.88s
// CPU Usage: 100% (one core)
// Memory Usage: 56.99MB

(async () => {
  console.time("WriteMany");

  const fileHandleWrite = await fs.open("text.txt", "w");

  const stream = fileHandleWrite.createWriteStream();

  // internal buffer size of stream object - 16384 bytes
  console.log(stream.writableHighWaterMark);

  let i = 0;
  const numberOfWrites = 10000000; //10million writes

  const writeMany = () => {
    while (i < numberOfWrites) {
      const buff = Buffer.from(` ${i} `, "utf-8");

      // this is our last write
      if (i === numberOfWrites - 1) {
        return stream.end(buff);
      }

      // if stream.write returns false, break
      if (!stream.write(buff)) break;

      i++;
    }
  };

  writeMany();

  // resume looping once our stream's internal buffer is emptied
  stream.on("drain", () => {
    writeMany();
  });

  stream.on("finish", () => {
    console.timeEnd("WriteMany");

    fileHandleWrite.close().then(() => {
      console.log("File closed successfully.");
    });
  });

  setInterval(() => {
    const memoryUsage = process.memoryUsage();
    console.log(
      `Memory Usage - RSS: ${memoryUsage.rss / (1024 * 1024)} MB, Heap Total: ${
        memoryUsage.heapTotal / (1024 * 1024)
      } MB, Heap Used: ${memoryUsage.heapUsed / (1024 * 1024)} MB`
    );
  }, 1000);
})();
