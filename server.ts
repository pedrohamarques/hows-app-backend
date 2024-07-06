import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import { chatGroups } from "./database/group-chats";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);

  socket.on("createNewGroup", (groupName) => {
    console.log("createNewGroup", groupName);
    chatGroups.unshift({
      id: chatGroups.length + 1,
      name: groupName,
      messages: [],
      createdAt: new Date(),
    });
  });

  socket.on("getAllGroups", () => {
    socket.emit("groupList", chatGroups);
  });

  socket.emit("groupList", chatGroups);

  socket.on("sendNewMessage", (message) => {
    const groupIndex = chatGroups.findIndex(
      (group) => group.id === message.groupid
    );

    chatGroups[groupIndex].messages.push({
      messageId: message.messageId,
      sendAt: message.sendAt,
      senderId: message.senderId,
      text: message.text,
    });
  });

  socket.on("getAllMessages", ({ index }) => {
    socket.emit("messageList", chatGroups[index - 1].messages);
  });

  //   socket.emit("messageList", chatGroups[index - 1]);
});

httpServer.listen(3000, () => {
  console.log("Server running on port 3000");
});
