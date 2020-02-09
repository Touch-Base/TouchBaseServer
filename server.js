/// importing dependencies and middleware

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// adding routers

const userRouter = require('./routers/usersRouter');
const jobsRouter = require('./routers/jobsRouter');

const server = express();

/// applying middleware 

server.use(helmet());
server.use(express.json());
server.use(cors());

/// applying endpoint routers

server.use('/api/users', userRouter);
server.use('/api/jobs', jobsRouter);

/// main get endpoint

server.get('/', (req, res) => {
    res.send("<h1>Welcome to the TouchBase API</h1>")
});

module.exports = server;