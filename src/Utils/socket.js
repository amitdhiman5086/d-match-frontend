import io from "socket.io-client";

const createConnection = () => {
  return io("https://d-match-backend.onrender.com");
};

export default createConnection;
