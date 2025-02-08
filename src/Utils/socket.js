import io from "socket.io-client";

const createConnection = () => {
  return io("http://13.60.18.36:3000");
};

export default createConnection;
