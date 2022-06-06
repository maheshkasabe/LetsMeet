const express = require("express")
const app = express();
const http = require("http")
const cors = require("cors")
const { Server, Socket }  = require("socket.io")
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
});

const PORT = process.env.PORT || 3001

app.get("/", (req,res) => {
        res.send("server running")
})

io.on('connection', (socket) => {
    socket.emit('me', socket.id);

    socket.on('disconnect', () => {
        socket.broadcast.emit("call ended");
    })

    socket.on("calluser", ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit("calluser", { signal: signalData, from: me });
    })

    socket.on("answercall", (data) => {
        io.to(data.to).emit("callaccepted", data.signal);
    })
    
})

server.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`)
})
