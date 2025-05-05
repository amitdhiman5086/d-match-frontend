import io from "socket.io-client";

const createConnection = () => {
  return io("https://d-match.onrender.com:3000");
};

export default createConnection;
