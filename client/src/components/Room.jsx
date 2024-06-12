import { useState, useEffect, useContext } from "react"
import Message from "../utils/Message"
import MessageTemplate from "./Message" 
import SocketContext from "../utils/SocketContext"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function Room() {
    const [messages, setMessages] = useState([])
    const [members, setMembers] = useState(1)
    const socket = useContext(SocketContext)
    const { room } = useParams() 
    const navigate = useNavigate()

    useEffect(() => {
        socket.emit("get_info", room)
    }, [])

    socket.on("info", (info) => {
        setMembers(info.members)
    })

    socket.on("message", (msg) => {
        setMessages(messages.concat(msg))
    })

    socket.on("new_join", (user) => {
        setMessages(messages.concat({joiner: user.name}))
        setMembers(user.members)
    })

    socket.on("leave", (user) => {
        setMessages(messages.concat({leaver: user.name}))
        setMembers(members - 1)
    })

    const handleSend = (event) => {
        event.preventDefault()
        console.log(`room: ${room}`)
        const msg = new Message(room, event.target.input.value, socket.id)
        socket.emit("message", msg)
    }

    const handleBack = () => {
        socket.emit("leaving", room)
        navigate("/")
    }

    return(
        <div>
            <button onClick={handleBack}>back</button>
            <h2>{room}</h2>
            <p>{members} members</p>
            <form onSubmit={handleSend}>
            <input name="input"></input>
            <button type="submit">send</button>
            </form>
            <div>
                {messages.map((msg) => {
                    if(msg.joiner) {
                        return <p key={msg}>** {msg.joiner} joined **</p>
                    } else if (msg.leaver) {
                        return <p key={msg}>** {msg.leaver} left **</p>
                    } else {
                        return <MessageTemplate message={msg.message} 
                            sender={msg.sender} time={msg.time} key={msg.time}/>
                    }
                })}
            </div>
        </div>
    )
}

export default Room