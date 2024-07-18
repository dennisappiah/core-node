const {spawn, exec} = require("node:child_process")


const subprocess = spawn("ls", ["-l"])

subprocess.stdout.on("data", (data) => {
    console.log(data.toString("utf-8"))
})

