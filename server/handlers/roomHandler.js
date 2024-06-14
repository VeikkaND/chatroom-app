module.exports = (io, socket, id) => {
    var socketUsername = id
    const createRoom = (name) => {
        socket.join(id)
        socketUsername = name
    }
    const joinRoom = async (info, callback) => {
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
    }
    const leaveRoom = async (info) => {
        const room = info.room
        io.to(room).emit("leave", {name: info.name})
        socket.leave(room)
    }
    const userDisconnecting = async () => {
        const roomIter = socket.rooms.values()
        for(const room of roomIter) {
            const members = await io.in(room).fetchSockets()
            io.to(room).emit("leave", {name: socketUsername, members: members.length})
        } 
    }
    const getInfo = async (room) => {
        const members = await io.in(room).fetchSockets()
        io.to(id).emit("info", {members: members.length})
    }

    socket.on("create", createRoom)
    socket.on("join", joinRoom)
    socket.on("leaving", leaveRoom)
    socket.on("disconnecting", userDisconnecting)
    socket.on("get_info", getInfo)
}