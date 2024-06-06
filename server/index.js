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
    })
    socket.on("disconnect", () => {
        console.log("user disconnected: " + id)
    })
})

server.listen(port, () => {
    console.log(`server running on port ${port}`)
})