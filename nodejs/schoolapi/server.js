const http = require('http');
const port = 3003; 
console.log("Running on Port => ", port);
const app = require("./app.js");

const server = http.createServer(app);
server.listen(port);
