/// importing dependencies and middleware

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');


const server = express();

/// applying middleware 

server.use(helmet());
server.use(express.json());
server.use(cors());

/// applying endpoint routers

/// main get endpoint

server.get('/', (req, res) => {
    res.send("<h1>Welcome to the TouchBase API</h1>")
});

module.exports = server;