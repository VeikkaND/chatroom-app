const express = require("express")
const cors = require("cors")
const { Server } = require("socket.io")
const { createServer } = require("http")

const port = 3000
const app = express()

app.use(cors())

const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    },
    connectionStateRecovery: {}
})

app.get("/", (req, res) => {
    res.send("test")
})

io.on("connection", (socket) => {
    const id = socket.id
    var socketUsername = id
    console.log("user connected: " + id)
    socket.on("message", (msg) => {
        const time = new Date()
        io.to(msg.room).emit("message", 
            {room: msg.room, message: msg.message, 
                sender: msg.sender, time: time.toLocaleTimeString("en-GB")})
    })
    socket.on("create", (name) => {
        socket.join(id)
        socketUsername = name
    })
    socket.on("join", async (info, callback) => {
        const room = info.room
        socketUsername = info.name
        const rooms = io.of("/").adapter.rooms
        if(rooms.has(room)) {
            socket.join(room)
            const members = await io.in(room).fetchSockets()
            io.to(room).emit("new_join", 
                {name: info.name, id: id, members: members.length})
            callback(true)
        } else {
            callback(false)
        }
    })
    socket.on("get_info", async (room) => {
        const members = await io.in(room).fetchSockets()
        io.to(id).emit("info", {members: members.length})
    })
    socket.on("leaving", async (info) => {
        const room = info.room
        io.to(room).emit("leave", {name: info.name})
        socket.leave(room)
    })
    socket.on("disconnecting", async () => {
        const roomIter = socket.rooms.values()
        for(const room of roomIter) {
            const members = await io.in(room).fetchSockets()
            io.to(room).emit("leave", {name: socketUsername, members: members.length})
        }
        
    })
    socket.on("disconnect", () => {
        console.log("user disconnected: " + id)
    })
})

server.listen(port, () => {
    console.log(`server running on port ${port}`)
})