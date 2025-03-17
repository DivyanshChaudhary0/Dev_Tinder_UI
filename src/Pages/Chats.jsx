import React, { useEffect, useState } from "react";
import socketConnection, { BASE_URL } from "../utils/Constants";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Chats = () => {
  const [socket, setSocket] = useState(null);
  const user = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const { targetUserId } = useParams();
  const [targetUserData, setTargetUserData] = useState({});
  const [online, setOnline] = useState("offline");
  const [lastSeen, setLastSeen] = useState("");

  useEffect(() => {
    const tempSocket = socketConnection();

    tempSocket.emit("chat-message", { userId: user?._id, targetUserId });

    tempSocket.on("online", (users) => {
      if (users[targetUserId]) {
        setOnline("online");
        setLastSeen("");
      }
    });

    tempSocket.on("offline", function(data){
        setOnline("offline");
        setLastSeen(data);
    })

    tempSocket.on("receiveMessage", ({ text, username, time }) => {
      setChats((prev) => [...prev, { text, username, time }]);
    });

    setSocket(tempSocket);

    axios
      .get(BASE_URL + `/user/findUser/${targetUserId}`, { withCredentials: true })
      .then((res) => {
        setTargetUserData(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      tempSocket.disconnect();
    };
  }, [user?._id, targetUserId]);

  function handleMessage() {
    socket.emit("sendMessage", { userId: user?._id, targetUserId, username: user.username, message });
    setMessage("");
  }

  return (
    <div className="min-w-80 lg:w-1/2 md:w-2/3 mt-2 mx-auto border border-black rounded">
      <div className="w-full h-[81vh] relative">
        <div className="w-full bg-gray-300 py-2 px-2 rounded ">
          <div className="flex items-center gap-4">
            <img className="w-12 h-12 object-cover rounded-full" src={targetUserData?.photoURL} alt="" />
            <div>
              <p>{targetUserData?.username}</p>
              <p className="text-xs font-semibold">
                {online === "online" ? "Online" : "Last seen " + lastSeen}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-[88%] md:h-[90%] overflow-y-scroll p-2">
          {chats &&
            chats.map((chat, idx) => (
              <div key={idx} className={`chat ${chat.username === user.username ? "chat-end" : "chat-start"}`}>
                <div className="chat-header">
                  {chat.username}
                  <time className="text-xs opacity-50">{chat.time}</time>
                </div>
                <div className="chat-bubble text-sm md:text-base">{chat.text}</div>
              </div>
            ))}
        </div>
      </div>
      <div className="w-full flex items-center justify-between">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-w-[82%] md:w-[95%] px-4 py-2 rounded"
          type="text"
          placeholder="Enter message"
        />
        <span onClick={handleMessage} className="px-4 py-2 bg-blue-400 rounded mx-2">
          <i className="ri-send-plane-fill"></i>
        </span>
      </div>
    </div>
  );
};

export default Chats;
