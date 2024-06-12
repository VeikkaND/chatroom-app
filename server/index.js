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
    console.log("user connected: " + id)
    socket.on("message", (msg) => {
        console.log(`(${id}) message: ` + msg.message)
        console.log(msg.room)
        const time = new Date()
        io.to(msg.room).emit("message", 
            {room: msg.room, message: msg.message, 
                sender: msg.sender, time: time.toLocaleTimeString("en-GB")})
    })
    socket.on("create", () => {
        console.log("creating new room")
        socket.join(id)
        // TODO
    })
    socket.on("join", async (room, callback) => {
        console.log("trying to join room " + room)
        const rooms = io.of("/").adapter.rooms
        if(rooms.has(room)) {
            console.log("joining room " + room)
            socket.join(room)
            const members = await io.in(room).fetchSockets()
            io.to(room).emit("new_join", {name: id, members: members.length})
            callback(true)
        } else {
            console.log(`room ${room} not found`)
            callback(false)
        }
    })
    socket.on("get_info", async (room) => {
        const members = await io.in(room).fetchSockets()
        io.to(id).emit("info", {members: members.length})
    })
    socket.on("disconnecting", async () => {
        const roomIter = socket.rooms.values()
        for(const room of roomIter) {
            const members = await io.in(room).fetchSockets()
            io.to(room).emit("leave", {name: id, members: members.length})
        }
        
    })
    socket.on("disconnect", () => {
        console.log("user disconnected: " + id)
    })
})

server.listen(port, () => {
    console.log(`server running on port ${port}`)
})