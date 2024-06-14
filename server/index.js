const express = require("express")
const cors = require("cors")
const { Server } = require("socket.io")
const { createServer } = require("http")
const roomHandlers = require("./handlers/roomHandler")
const messageHandlers = require("./handlers/messageHandler")

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

io.on("connection", (socket) => {
    const id = socket.id
    console.log("user connected: " + id)

    roomHandlers(io, socket, id)
    messageHandlers(io, socket)

    socket.on("disconnect", () => {
        console.log("user disconnected: " + id)
    })
})

server.listen(port, () => {
    console.log(`server running on port ${port}`)
})