const express = require("express");
// const path = require("path");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "https://musing-leavitt-21552a.netlify.app",
    methods: ["GET"],
  },
});

let usersOnline = 0;

io.on("connection", (socket) => {
  let nickname = "anonymous69";
  usersOnline += 1;
  io.emit("user connected", usersOnline);
  socket.on("nickname", (name) => {
    nickname = name;
  });
  socket.on("chat message", (msg) => {
    io.emit("chat", { msg, nickname });
  });
  socket.on("disconnect", (reason) => {
    usersOnline -= 1;
    io.emit("user disconnected", usersOnline);
  });
  console.log("new user");
  console.log(usersOnline);
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
