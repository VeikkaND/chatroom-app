module.exports = (io, socket) => {
    const createMessage = (msg) => {
        const time = new Date()
        io.to(msg.room).emit("message", 
            {room: msg.room, message: msg.message, 
                sender: msg.sender, time: time.toLocaleTimeString("en-GB")})
    }

    socket.on("message", createMessage)
}