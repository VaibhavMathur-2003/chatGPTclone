import { useState } from "react";
import "./App.css";
function App() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([
    {
      user: "gpt",
      message: "How can i help you today?",
    },{ user: "me", message: "Fine as a muhfucker" }
  ]);

  async function handleSubmit(e) {
    e.preventDefault();
    setInput("");
    setChat([...chat, { user: "me", message: `${input}` }]);

    const response = await fetch("http://localhost:3080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: chat.map((message) => message.message).join(""),
      })
    });
    const data = await response.json();
    setChat([...chat, {user:"gpt", message:`${data.message}`}])
    console.log(data);
  }
  return (
    <div className="App">
      <div className="chatgpt">
        <div className="sidebar">
          <div className="new-chat">+ New Chat</div>
        </div>
        <div className="interface">
          {chat.map((message, idx) => (
            <ChatMessage key={idx} message={message} />
          ))}
          {/* <div className="chat aireply">
            <img
              className="avatar"
              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt=""
            />
            <div>Hi</div>
          </div> */}
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="text-box"
                name=""
                id=""
                rows="2"
              ></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

const ChatMessage = ({ message }) => {
  return (
    <div className="chat">
      {message.user === "gpt" && (
        <img
          className={`avatar ${message.user === "gpt" && "aireply"}`}
          src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          alt=""
        />
      )}
      <div>{message.message}</div>
    </div>
  );
};
