import express from "express";
import { Server } from "socket.io";

const app = express();

const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log("Server is running on http://localhost:3000");
});

//Static file
app.use(express.static("public"));

//Socket setup
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Made socket connection", socket.id);

  socket.on("chat", (data) => {
    io.sockets.emit("chat", { ...data, senderId: socket.id });
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});
