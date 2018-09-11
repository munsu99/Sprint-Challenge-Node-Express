const express = require('express');
const server = express();
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const projectRoutes = require('./data/projectRoutes');
const actionRoutes = require('./data/actionRoutes')

server.use(express.json());
server.use(morgan('dev'));
server.use(helmet());
server.use(cors());

server.use('/projects', projectRoutes);
server.use('/actions', actionRoutes);

server.listen(9000, () => console.log('\== API on port 9k ==\n'));