const app = require('./app');
const port = 3000;
const server = require('http').createServer(app);

server.listen(port);