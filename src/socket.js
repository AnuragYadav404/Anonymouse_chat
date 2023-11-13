import { io } from "socket.io-client";

const URL = "http://localhost:3000";

export const socket = io(URL, {
  autoConnect: false, // this basically controls if a connection request
  // is sent straight off or not
  auth: {
    serverOffset: 0,
  },
  ackTimeout: 3000,
  retries: 3,
});
