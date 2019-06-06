const server = require("./server.js");

const port = 5000;

server.listen(port, function() {
  console.log(`\n=== API listening on http://localhost:${port} ===\n`);
});
