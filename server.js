const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

// Router goes here
const userRouter = require("./users/user-router.js");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan("tiny"));

// Router paths
server.use("/api/", userRouter);

// trash online test
server.get("/", (req, res) => {
  res.send("<h1>Yup, it's here</h1>");
});

// server export
module.exports = server;
