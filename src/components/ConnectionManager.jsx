import { useState } from "react";
import { socket } from "../socket";

export function ConnectionManager() {
  const [is_loading, set_is_loading] = useState(false);

  function handleConnect() {
    set_is_loading(true);
    socket.connect();

    socket.on("connect", () => {
      set_is_loading(false);
    });
  }

  function handleDisconnect() {
    socket.disconnect();
  }

  return (
    <>
      {is_loading && <i>Connecting ...</i>}
      <button onClick={handleConnect}>Connect</button>
      <button onClick={handleDisconnect}>Disconnect</button>
    </>
  );
}
