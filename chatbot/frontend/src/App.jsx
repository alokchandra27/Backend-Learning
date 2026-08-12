import { useEffect, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";

const getCurrentTime = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const initialMessages = [
  {
    id: 1,
    sender: "bot",
    text: "Hello! I am your assistant. Ask me anything.",
    timestamp: getCurrentTime(),
  },
];

function App() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (event) => {
    event.preventDefault();

    const trimmedMessage = input.trim();
    if (!trimmedMessage) return;

    const newUserMessage = {
      id: Date.now(),
      sender: "user",
      text: trimmedMessage,
      timestamp: getCurrentTime(),
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setIsTyping(true);

    socket.emit("ai-message", trimmedMessage);

    setInput("");
  };

  useEffect(() => {
    let socketInstance = io("http://localhost:3000");
    setSocket(socketInstance);

    socketInstance.on("ai-response", (response) => {
      const newBotMessage = {
        id: Date.now(),
        sender: "bot",
        text: response,
        timestamp: getCurrentTime(),
      };

      setMessages((prevMessages) => [...prevMessages, newBotMessage]);
      setIsTyping(false);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <div className="chat-app">
      <div className="chat-window">
        <header className="chat-header">
          <div className="header-avatar">AI</div>
          <div>
            <h1>Chat Assistant</h1>
          </div>
        </header>

        <div className="chat-body">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message-row ${message.sender === "user" ? "user" : "bot"}`}
            >
              <div className="message-content">
                <div className="message-bubble">{message.text}</div>
                <div className="message-timestamp">{message.timestamp}</div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="message-row bot">
              <div className="message-content">
                <div className="typing-indicator" aria-label="Typing indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="message-timestamp">Thinking...</div>
              </div>
            </div>
          )}
        </div>

        <form className="chat-input-bar" onSubmit={handleSend}>
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Type your message..."
            aria-label="Type your message"
          />
          <button type="submit" disabled={!input.trim()}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
