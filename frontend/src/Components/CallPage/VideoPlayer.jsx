import React, { useContext } from 'react'
import { ContextProvider, SocketContext } from '../../SocketContext'
import "./videoplayer.css"
import { BsFillMicFill,BsFillCameraVideoFill,BsFillPersonPlusFill,BsClipboardCheck } from "react-icons/bs"
import { HiPhoneMissedCall } from "react-icons/hi"



const VideoPlayer = () => {
    const { call,
        accepted,
        ended,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        me,
        callUser,
        leavecall,
        answercall, } = useContext(SocketContext);
    return (
        <div className='videoplayer'>
            <div className='header'>
                <div className='main-header'>
                        <p>Let's Meet Meetings </p>
                </div>
                <div className='next-header'>
                    <div className='btns1'>
                    <button><BsFillMicFill /> Mute</button>
                    <button><BsFillCameraVideoFill /> Stop Video</button>
                    <button><BsClipboardCheck /> Copy Meeting Code</button>
                    <button><BsFillPersonPlusFill /> invite</button>
                    </div>

                    <div className='btns2'>
                    <button><HiPhoneMissedCall /> Leave</button>
                    </div>
                </div>
            </div>

            <div className='broadcast'>
            <div className='meet'>
            { (
                <video playsInline muted ref={myVideo} autoPlay />
            )
            }

            </div>
            
            <div className='chat'>
                Chat
            </div>
            
            </div>


        </div>
    )
}

export default VideoPlayer