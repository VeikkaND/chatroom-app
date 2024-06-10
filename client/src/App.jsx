import { io } from "socket.io-client"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Room from "./components/Room"

function App() {
  const [roomState, setRoomState] = useState(false)
  const dispatch = useDispatch()
  const socket = io("http://localhost:3000/")
  
  if(!roomState) {
    const handleCreate = () => {
      socket.emit("create")
      setRoomState(socket.id)
    }

    const handleSubmit = (event) => {
      const room = event.target.code.value
      dispatch(set(room)) // check if room exists first
    }

    return (
      <div>
        <button onClick={handleCreate}>create room</button>
        <form onSubmit={handleSubmit}>
          <input name="code"></input>
          <button type="submit">join</button>
        </form>
      </div>
    )
  } else {
    return (
      <Room socket={socket}/>
    )
  }
  
}

export default App
