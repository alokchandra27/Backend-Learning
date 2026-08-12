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


io.on("connection", (socket) => {

const chatHistory = [];

  console.log("A user connected");

  socket.on("ai-message", async (data) => {
    console.log("Received message:", data);

    chatHistory.push({
      type: "user_input",
      content: [
        {
          type: "text",
          text: data,
        },
      ],
    });

    const response = await generateText(chatHistory);

    console.log("AI response:", response);
    // console.log(JSON.stringify(response, null, 2));

    chatHistory.push({
      type: "model_output",
      content: [
        {
          type: "text",
          text: response,
        },
      ],
    });

    socket.emit("ai-response", response);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});;



app.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
