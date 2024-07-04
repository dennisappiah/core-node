const fs = require("fs/promises");

// we are interested in only writing specific numbers / data to our destination file
// we want to extract all even numbers to our destination file

(async () => {
  const fileHandleRead = await fs.open("text.txt", "r");
  const fileHandleWrite = await fs.open("destination.txt", "w");

  const streamRead = fileHandleRead.createReadStream();
  const streamWrite = fileHandleWrite.createWriteStream();

  streamRead.on("data", (chunk) => {
    // decoding chunks to string
    // Decoding chunks to string
    const numbers = chunk.toString("utf-8").split(/\s+/).filter(Boolean);

    // Filtering even numbers
    const evenNumbers = numbers.filter((num) => parseInt(num) % 2 === 0);

    // Writing even numbers to the destination file
    const dataToWrite = evenNumbers.join(" ") + " ";

    // if internal buffer size is full, stream.write returns false
    if (!streamWrite.write(dataToWrite)) {
      streamRead.pause();
    }
  });

  streamWrite.on("drain", () => {
    streamRead.resume();
  });

  streamRead.on("end", async () => {
    streamWrite.end();
    await fileHandleRead.close();
    await fileHandleWrite.close();
    console.log("Done processing");
  });
})();
