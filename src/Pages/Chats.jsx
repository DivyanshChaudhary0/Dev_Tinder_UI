
import React, { useEffect, useState } from 'react'
import socketConnection from '../utils/Constants';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Chats = () => {

  const [socket,setSocket] = useState(null)
  const user = useSelector((state)=> state.user)
  const [message,setMessage] = useState("");
  const [chats,setChats] = useState([]);
  const {targetUserId} = useParams();

  useEffect(()=>{
    const tempSocket = socketConnection();

    tempSocket.emit("chat-message", {userId:user?._id, targetUserId})

    tempSocket.on("receiveMessage", function({text,username,time}){
      console.log(text,username);
      setChats((prev)=> [...prev,{text,username,time}])
    })

    setSocket(tempSocket)
  },[])

  function handleMessage(){
    socket.emit("sendMessage", {userId:user?._id, targetUserId,username: user.username,message})
    setMessage("");
  }

  return (
    <div className='min-w-80 lg:w-1/2 md:w-2/3 mt-2 mx-auto border border-black rounded'>
        <div className='w-full h-[81vh] overflow-y-scroll px-4 py-1'>
          {
            chats && chats.map((chat,idx)=> (
              <div key={idx} className="chat chat-start">
                <div className="chat-header">{chat.username}
                  <time className="text-xs opacity-50">{chat.time}</time>
                </div>
                <div className="chat-bubble text-sm md:text-base">{chat.text}</div>
              </div>
            ))
          }
        </div>
        <div className='w-full flex items-center justify-between'>
          <input value={message} onChange={(e)=> setMessage(e.target.value)} className='min-w-[82%] md:w-[90%] px-4 py-2 rounded' type="text" placeholder='Enter message' />
          <span onClick={()=> handleMessage()} className='px-4 py-2 bg-blue-400 rounded mx-2'><i className="ri-send-plane-fill"></i></span>
        </div>
    </div>
  )
}

export default Chats