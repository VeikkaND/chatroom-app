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
        console.log(`(${id}) message: ` + msg)
        io.emit("message", msg)
    })
    socket.on("create", () => {
        console.log("creating new room")
        socket.join(id)
        // TODO
    })
    socket.on("join", (room) => {
        console.log("trying to join room " + room)
        const rooms = io.of("/").adapter.rooms
        if(rooms.has(room)) {
            console.log("joining room " + room)
            socket.join(room)
        } else {
            console.log(`room ${room} not found`)
        }

    })
    socket.on("disconnect", () => {
        console.log("user disconnected: " + id)
    })
})

server.listen(port, () => {
    console.log(`server running on port ${port}`)
})