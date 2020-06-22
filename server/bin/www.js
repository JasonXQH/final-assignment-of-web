const http = require('http');

const PORT = 8080;
const serverHandle = require('../server');

const server = http.createServer(serverHandle);

server.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
