import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import createConnection from "../Utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../Utils/constant";

const Chat = () => {
  const { toUserId } = useParams();
  const user = useSelector((store) => store.user);
  const [messages, setMessages] = useState("");
  const [chatMesssages, setChatMessages] = useState([]);
  const userId = user?._id;
  const firstNameUSer = user?.firstName;
  console.log(chatMesssages);

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + toUserId, {
      withCredentials: true,
    });

    const datas = chat.data.chat.messages;

    datas.map((data) => {
      setChatMessages((chatMesssages) => [
        ...chatMesssages,
        {
          name: data.senderId?.firstName,
          text: data.text,
          photoURL: data.senderId?.photoURL,
        },
      ]);
    });
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const socket = createConnection();
    socket.emit("joinChat", { firstName: user?.firstName, userId, toUserId });

    socket.on("messageReceived", ({ firstName, text, photoURL }) => {
      console.log(firstName + " " + text);
      setChatMessages((chatMesssages) => [
        ...chatMesssages,
        { name: firstName, text, photoURL: photoURL },
      ]);
    });

    return () => {
      socket.disconnect();

      console.log(user?.firstName + "Disconnected");
    };
  }, [userId, toUserId]);

  const handleSendMessage = () => {
    const socket = createConnection();

    socket.emit("sendMessage", {
      firstName: user?.firstName,
      userId,
      toUserId,
      text: messages,
      photoURL: user?.photoURL,
    });

    return setMessages("");
  };

  return (
    <div className="max-w-3xl flex flex-col h-[90vh] md:h-[70vh] justify-center mx-auto my-2 md:my-8  rounded-2xl border-gray-700 md:border-2 md:bg-base-300">
      <h1 className="text-3xl self-center font-bold border-b w-full text-center mt-4">
        Chat
      </h1>

      <div className="flex-1  p-5 my-5 overflow-y-scroll ">
        {chatMesssages &&
          chatMesssages.map((messages, index) => (
            <div key={index} >
              {!(messages.name == firstNameUSer) && (
                <div className="chat  chat-start">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src={messages.photoURL}
                      />
                    </div>
                  </div>
                  <div className="chat-header py-1  font-bold ">{messages.name}</div>
                  <div className="chat-bubble-info px-4 py-3 rounded-2xl">{messages.text}</div>
                </div>
              )}
              {messages.name == firstNameUSer && (
                <div className="chat chat-end">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src={messages.photoURL}
                      />
                    </div>
                  </div>
                  <div className="chat-header  py-1  font-bold ">{messages.name}</div>
                  <div className="chat-bubble-primary px-4 py-3 rounded-2xl">{messages.text}</div>
                </div>
              )}
            </div>
          ))}
      </div>

      <div className="w-full  flex flex-col md:flex-row justify-around items-center px-5 pb-4 pt-3 gap-2 md:gap-5 ">
        <input
          type="text"
          value={messages}
          onChange={(e) => setMessages(e.target.value)}
          placeholder="Type here"
          className="input input-bordered w-full   "
        />
        <button
          onClick={handleSendMessage}
          className="btn btn-primary w-full md:w-fit"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
