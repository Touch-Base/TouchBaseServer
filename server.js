/// importing dependencies and middleware

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// adding routers

const userRouter = require("./routers/usersRouter");
const jobsRouter = require("./routers/jobsRouter");
const connectionsRouter = require("./routers/connectionsRouter");
const eventsRouter = require("./routers/eventsRouter");
const eafRouter = require("./routers/eafRouter");

const server = express();

/// applying middleware

server.use(helmet());
server.use(express.json());
server.use(cors());

/// applying endpoint routers

server.use("/api/users", userRouter);
server.use("/api/jobs", jobsRouter);
server.use("/api/connections", connectionsRouter);
server.use("/api/events", eventsRouter);
server.use("/eaf", eafRouter);

/// main get endpoint

server.get("/", (req, res) => {
  res.send("<h1>Welcome to the TouchBase API</h1>");
});

module.exports = server;
