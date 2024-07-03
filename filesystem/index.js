const fs = require("fs/promises");

/**
 * Promises API
 */

(async () => {
  try {
    await fs.copyFile("text.txt", "copied_text.txt");
  } catch (err) {
    console.log(err);
  }
})();

/**
 * Callback API
 */
const fs = require("fs");

fs.copyFile("text.txt", "copied_text2.txt", (error) => {
  if (error) console.log(error);
});

/**
 * Synchronous API
 */

fs.copyFileSync("text.txt", "copied_sync.txt");

const binary_content = fs.readFileSync("./text.txt");

console.log(binary_content); // returns buffer of hex data <Buffer 54 68 69 73 20 69 73 20 61 20 74 65>
console.log(binary_content.toString("utf-8"));
