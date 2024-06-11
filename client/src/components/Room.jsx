import { useState } from "react"
import { useSelector } from "react-redux"
import Message from "../utils/Message"

function Room({socket, room}) {
    const [messages, setMessages] = useState([])

    socket.on("message", (msg) => {
        setMessages(messages.concat(msg.message))
    })

    const handleSend = (event) => {
        event.preventDefault()
        console.log(`room: ${room}`)
        const msg = new Message(room, event.target.input.value)
        socket.emit("message", msg)
    }

    return(
        <div>
            <form onSubmit={handleSend}>
            <input name="input"></input>
            <button type="submit">send</button>
            </form>
            <div>
                {messages.map((msg) => <p key={msg}>{msg}</p>)}
            </div>
        </div>
    )
}

export default Room