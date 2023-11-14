import { useState } from "react";

import { socket } from "./socket";
import { useEffect } from "react";
import { ConnectionManager } from "./components/ConnectionManager";
import { MessagesList } from "./components/MessagesList";
import { NewMesssageForm } from "./components/NewMessageForm";

function Chat() {
  const [is_connected, set_is_connected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function on_connect() {
      console.log("socket has connected", socket.id);
      console.log("socket server offset is", socket.auth.serverOffset);
      console.log("socket is", socket);
      set_is_connected(true);
    }

    function on_disconnect() {
      console.log("socket has disconnected", socket.id);
      console.log("socket server offset is", socket.auth.serverOffset);
      set_is_connected(false);
    }

    function on_chat_message(msg, server_message_offset) {
      console.log("socket has received a new message from the server", msg);
      socket.auth.serverOffset = server_message_offset;
      setMessages((msgs) => [...msgs, msg]);
    }

    socket.on("connect", on_connect);
    socket.on("disconnect", on_disconnect);
    socket.on("chat_message", on_chat_message);

    return () => {
      socket.off("connect", on_connect);
      socket.off("disconnect", on_disconnect);
      socket.off("chat_message", on_chat_message);
    };
  }, []);

  return (
    <>
      <h1>Hola Amigos!</h1>
      <p>
        Current connection status: $
        {is_connected ? "connected" : "disconnected"}
      </p>
      <MessagesList messages={messages} />
      <ConnectionManager />
      <NewMesssageForm updateMessages={setMessages} />
    </>
  );
}

export default Chat;
