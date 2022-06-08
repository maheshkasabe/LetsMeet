import React, { useState,useEffect } from 'react'
//import { SocketContext } from '../../SocketContext'
import "./videoplayer.css"
import { BsFillMicFill,BsFillCameraVideoFill,BsFillPersonPlusFill,BsClipboardCheck } from "react-icons/bs"
import { HiPhoneMissedCall } from "react-icons/hi"
import {FiSend } from "react-icons/fi"
import { useNavigate } from 'react-router-dom'

const VideoPlayer = ({ socket, username, room }) => {
    //const {  stream,userVideo,myVideo,ended,accepted,me,leavecall } = useContext(SocketContext);

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
      if (currentMessage !== "") {
        const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);


    return (
        <div className='videoplayer'>
            <div className='header'>
                <div className='main-header'>
                        <p>Let's Meet Meetings </p>
                </div>
                <div className='next-header'>
                    <div className='btns1'>
                    <button>Mute <BsFillMicFill /> </button>
                    <button> Stop Video <BsFillCameraVideoFill /> </button>
                   <button> Copy Meeting Code <BsClipboardCheck /> </button> 
                    <button> invite <BsFillPersonPlusFill /> </button>
                    </div>

                    <div className='btns2'>
                    <button ><HiPhoneMissedCall /> Leave</button>
                    </div>
                </div>
            </div>

            <div className='broadcast'>
            <div className='meet'>

            {/* { stream && (
                <video playsInline muted ref={myVideo} autoPlay />
            )}

            {accepted && (
                <video playsInline muted ref={userVideo} autoPlay />
            )} */}


            </div>
            
            <div className='chat'>
                <div className='participants'>
                        <p>Participants </p>

                </div>

                <div className='conversation'>
                    <p>Meeting Chat</p>

                    <div className='chat-content'>
                        {messageList.map((messagecontent) => {
                            return (
                            <div id={username === messagecontent.author ? "you" : "other"}>
                                <p>{messagecontent.author} : {messagecontent.message}</p>
                           </div>
                            )
                        })
                        }
                    </div>
                    
                    <div className='buttons'>
                    <input placeholder='Type Something...' value={currentMessage} onChange={(event) => {setCurrentMessage(event.target.value) }} onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }} /> <button onClick={sendMessage}><FiSend size={20}/></button>
                    </div>
                    
                </div>
            </div>
            
            </div>


        </div>
    )
}

export default VideoPlayer