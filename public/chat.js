// Make connection (same origin as the page, so no URL/port needed)
const socket = io();

const form = document.getElementById("chat-form");
const message = document.getElementById("message");
const handle = document.getElementById("handle");
const output = document.getElementById("output");
const feedback = document.getElementById("feedback");
const chatWindow = document.getElementById("chat-window");

// Emit events

form.addEventListener("submit", (e) => {
  e.preventDefault(); // stop page reload
  if (!message.value.trim()) return;
  socket.emit("chat", {
    message: message.value,
    handle: handle.value,
  });
  message.value = "";
});

message.addEventListener("keypress", () => {
  socket.emit("typing", handle.value);
});

//Listen for the events
socket.on("chat", (data) => {
  feedback.innerHTML = "";

  const isMine = data.senderId === socket.id;

  const p = document.createElement("p");
  p.className = isMine ? "mine" : "theirs";

  const name = document.createElement("strong");
  name.textContent = data.handle + ": ";

  p.append(name, data.message);
  output.appendChild(p);

  chatWindow.scrollTop = chatWindow.scrollHeight;
});

socket.on("typing", (data) => {
  feedback.innerHTML = "<p><em>" + data + " is typing a message...</em></p>";
});
