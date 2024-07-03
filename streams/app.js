const fs = require("node:fs/promises");

// Execution time: 39.563s
// CPU Usage: 100% (one core)
// Memory Usage: 32MB

(async () => {
  console.time("WriteMany");
  const fileHandler = await fs.open("text.txt", "w");

  for (let i = 0; i < 1000000; i++) {
    await fileHandler.write(`${i}`);
  }
  console.timeEnd("WriteMany");
})();

// USING STREAMS
// Execution time: 495.305ms
// CPU Usage: 100% (one core)
// Memory Usage:

(async () => {
  console.time("WriteMany");

  const fileHandler = await fs.open("./text.txt", "w");

  const stream = fileHandler.createWriteStream();

  // internal buffer size of stream object - 16384 bytes
  console.log(stream.writableHighWaterMark);

  let i = 0;

  const writeMany = () => {
    while (i < 1000000) {
      const buff = Buffer.from(`${i}`, "utf-8");

      // this is our last write
      if (i === 999999) {
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

    fileHandler.close();
  });
})();
