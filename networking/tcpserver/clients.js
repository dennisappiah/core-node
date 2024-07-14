const net = require("net");

const socket = net.createConnection({ host: "127.0.0.1", port: 3099 }, () => {
  // writing buffer to the socket stream
  const buff = Buffer.alloc(2);
  buff[0] = 12;
  buff[1] = 34;

  // client sending buffer data to the server
  socket.write(buff);
});
