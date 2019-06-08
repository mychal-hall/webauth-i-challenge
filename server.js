const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const session = require("express-session");
const SessionStore = require("connect-session-knex");

// Routers go here
const userRouter = require("./users/user-router.js");

const server = express();

const sessionConfig = {
  name: "batman",
  secret: "and robin",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000,
    secure: false,
    httpOnly: true
  },
  store: new SessionStore({
    knex: require("./data/dbConfig.js"),
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 60 * 60 * 1000
  })
};

server.use(session(sessionConfig));
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
