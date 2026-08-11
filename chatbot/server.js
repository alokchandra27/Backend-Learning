const app = require("./src/app");
const http = require("http");
const { Server } = require("socket.io");
const { generateText } = require("./src/services/ai.service");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const chatHistory = [];



io.on("connection", (socket) => {
  console.log("A user connected");


  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("ai-message", async (data) => {
    console.log("Received message from client:", data);

    chatHistory.push({
      role: "user",
      parts: [{text: data}],
    });

    const response = await generateText(data);
    console.log("AI response:", response);

    chatHistory.push({
      role: "model",
      larts: [{text: response}],
    });

    socket.emit("ai-response", response);
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});


module.exports = { app, server, io, chatHistory };