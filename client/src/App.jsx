import { io } from "socket.io-client"

function App() {
  const socket = io("http://localhost:3000/")

  return (
    <div>
      <form onSubmit={(event) => {
        event.preventDefault()
        socket.emit("message", event.target.input.value)
      }}>
        <input name="input"></input>
        <button type="submit">send</button>
      </form>
    </div>
  )
}

export default App
