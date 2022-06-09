import React, { useState,useEffect,useContext } from 'react'
import { SocketContext } from '../../SocketContext'
import "./videoplayer.css"
import { BsFillMicFill,BsFillCameraVideoFill,BsFillPersonPlusFill,BsClipboardCheck } from "react-icons/bs"
import { HiPhoneMissedCall } from "react-icons/hi"
import {FiSend } from "react-icons/fi"

const VideoPlayer = ({ socket, username, room }) => {
    const {    call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall, } = useContext(SocketContext);

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

  console.log(me);

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
                    <button onClick={() => {navigator.clipboard.writeText(me)}}> Copy Meeting Code <BsClipboardCheck /> </button>
                    <button> invite <BsFillPersonPlusFill /> </button>
                    </div>

                    <div className='btns2'>
                    <button onClick={leaveCall}><HiPhoneMissedCall /> Leave</button>
                    </div>
                </div>
            </div>

            <div className='broadcast'>
            <div className='meet'>

            { stream && (
                <div>
                    <p>{name}</p>
                    <video playsInline muted ref={myVideo} autoPlay />
                </div>
                
            )}

            {callAccepted && !callEnded &&  (
                    <div>
                        <p>{call.name}</p>
                        <video playsInline muted ref={userVideo} autoPlay />
                     </div>
            )}

            </div>
            
            <div className='chat'>
                <div className='participants'>
                    {
                        call.isReceivingCall && !callAccepted && (
                            <div>
                            <p>{call.name} is calling  <button onClick={answerCall}> Ans</button></p>
                            </div>
                        )
                    }
                       

                </div>

                <div className='conversation'>
                    <p>Meeting Chat</p>

                    <div className='chat-content'>
                        {messageList.map((messagecontent) => {
                            return (
                            <div id={username === messagecontent.author ? "you" : "other"}>
                                <p>{messagecontent.author} : {messagecontent.message}</p>
                                <p>{messagecontent.time}</p>
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