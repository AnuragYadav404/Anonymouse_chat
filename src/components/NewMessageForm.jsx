import { useRef, useState } from "react";
import { socket } from "../socket";

export function NewMesssageForm({ updateMessages }) {
  console.log("message form rendered");
  const [messageInput, setMessageInput] = useState("");
  const [is_loading, set_is_loading] = useState(false);

  const msgCounter = useRef(1);

  function handleNewMessage(e) {
    e.preventDefault();
    set_is_loading(true);
    const messageid = `${socket.id} - ${msgCounter.current++}`;
    console.log("socket id: ", socket.id);
    console.log("message counter: ", msgCounter.current);
    console.log("message id is", messageid);
    socket.emit("chat_message", messageInput, messageid, () => {
      set_is_loading(false);
      setMessageInput("");
      updateMessages((msgs) => [...msgs, messageInput]);
      socket.auth.serverOffset += 1;
    });
  }

  return (
    <>
      {is_loading && <i>Hang tight, we are serving your message</i>}
      <form onSubmit={handleNewMessage}>
        <input
          type="text"
          name="message"
          id="message"
          required={true}
          placeholder="What's on your mind?"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button type="submit" disabled={!socket.connected || is_loading}>
          Send
        </button>
      </form>
    </>
  );
}
