const fs = require("fs/promises");

(async () => {
  const filePath = "./command.txt";

  const fileHandler = await fs.open(filePath, "r");

  fileHandler.on("change", async () => {
    // get size of file
    const size = (await fileHandler.stat()).size;

    // allocate our buffer size  with the size of the file
    const buff = Buffer.alloc(size);

    // location in the buffer to fill with data (element 1)
    const offset = 0;
    // number of bytes we want to read
    const length = buff.byteLength;
    // the position that we want to start reading
    const position = 0;

    // read binary content of file
    await fileHandler.read(buff, offset, length, position);

    // decode binary content
    console.log(buff.toString("utf-8"));
  });

  // track changes made command.txt file
  const watcher = fs.watch(filePath);

  for await (const event of watcher) {
    if (event.eventType === "change") {
      fileHandler.emit("change");
    }
  }
})();
