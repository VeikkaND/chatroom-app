import { useState } from "react"
import Message from "../utils/Message"
import MessageTemplate from "./Message" 

function Room({socket, room}) {
    const [messages, setMessages] = useState([])

    socket.on("message", (msg) => {
        setMessages(messages.concat(msg))
    })

    const handleSend = (event) => {
        event.preventDefault()
        console.log(`room: ${room}`)
        const msg = new Message(room, event.target.input.value, socket.id)
        socket.emit("message", msg)
    }

    return(
        <div>
            <h2>{room}</h2>
            <form onSubmit={handleSend}>
            <input name="input"></input>
            <button type="submit">send</button>
            </form>
            <div>
                {messages.map((msg) => 
                    <MessageTemplate message={msg.message} sender={msg.sender} key={msg.message}/>)}
            </div>
        </div>
    )
}

export default Room