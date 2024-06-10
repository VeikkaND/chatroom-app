import { useState } from "react"
import { useSelector } from "react-redux"

function Room({socket}) {
    const [messages, setMessages] = useState([])

    socket.on("message", (msg) => {
        setMessages(messages.concat(msg))
      })

    return(
        <div>
            
            <form onSubmit={(event) => {
            event.preventDefault()
            socket.emit("message", event.target.input.value)
            }}>
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