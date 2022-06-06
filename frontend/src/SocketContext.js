import  React, { createContext, useState, useRef, useEffect  } from "react"
import { io } from "socket.io-client"
import { peer } from "simple-peer"

const SocketContext = createContext();

const socket = io('http://localhost:3001');

const ContextProvider = ( { children } ) => {
    const [stream ,setStream] = useState(null);
    const [me, setMe] = useState('');
    const[call, setCall] = useState({});
    const[accepted, setCallAccepted] = useState(false);
    const[ended, setCallEnded] = useState(false);
    const[name, setName] = useState('');

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video:true, audio: true })
        .then((currenSteam) => {
            setStream(currenSteam);
            myVideo.current.srcObject = currenSteam;
        });
        socket.on('me', (id) => setMe(id));
        
        socket.on('caluser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivedCall: true, from, name: callerName, signal })
        } )
    }, []);

    const answercall = () => {
        setCallAccepted(true);

        const peer = new peer({ intiator: false, tirckle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('answercall', {signal: data, to:call.from })
        })

        peer.on('stream', (currenSteam) => {
            userVideo.curren.srcObject = currenSteam;
        })

        peer.signal(call.signal);

        connectionRef.current = peer;
    }

    const callUser= (id) => {
        const peer = new peer({ intiator: false, tirckle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('calluser', {userTocall: id, signalData: data, from: me, name })
        })

        peer.on('stream', (currenSteam) => {
            userVideo.curren.srcObject = currenSteam;
        })

        socket.on('callaccepted', (signal) => {
            setCallAccepted(true);

            peer.signal(signal);
        });

        connectionRef.current = peer;

    }

    const leavecall = () => {
        setCallEnded(true);

        connectionRef.current.destroy();
        
        window.location.reload();
    }

    return (
        <SocketContext.Provider value={{
            call,
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
            answercall,
        }}>
            {children}
        </SocketContext.Provider>
    );

} 

export { ContextProvider, SocketContext } 
