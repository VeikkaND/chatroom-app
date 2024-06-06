import { io } from "socket.io-client"
import { useState } from "react"

function App() {
  const [messages, setMessages] = useState([])
  const socket = io("http://localhost:3000/")

  socket.on("message", (msg) => {
    setMessages(messages.concat(msg))
  })

  return (
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

export default App
