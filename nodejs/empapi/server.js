const http = require('http');
const app = require('./app.js'); // app file include

const port  = 3003;
console.log('port => ',port);

const server = http.createServer(app);
server.listen(port);

