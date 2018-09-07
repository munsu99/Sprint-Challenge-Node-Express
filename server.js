const express = require('express');

const server = express();

server.use(express.json());

server.listen(9000, () => console.log('\== API on port 9k ==\n'));