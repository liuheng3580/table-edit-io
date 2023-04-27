const express = require("express");
const { Server } = require("socket.io");
const io = new Server(3001, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const userData = [
  {
    id: 1,
    name: "张山",
    age: 20,
    city: "河南",
    address: "花果山",
  },
  {
    id: 2,
    name: "张龙",
    age: 20,
    city: "山东",
    address: "白骨洞",
  },
  {
    id: 3,
    name: "张天",
    age: 20,
    city: "乌鲁木齐",
    address: "九幽山",
  },
  {
    id: 4,
    name: "张雪",
    age: 20,
    city: "浙江",
    address: "空洞",
  },
];

io.on("connection", (socket) => {
  // ...
  socket.emit("userList", userData);
  socket.on("updateList", (val) => {
    userData[val.idx][val.file] = val.value;
    console.log("userData[val.idx][val.file]", userData);
    io.emit("userList", userData);
  });
});

const app = new express();
app.listen(3000, () => {
  console.log("启动成功");
});
