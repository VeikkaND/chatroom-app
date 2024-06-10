import { io } from "socket.io-client"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Room from "./components/Room"

function App() {
  const [roomState, setRoomState] = useState(false)
  const [socket, setSocket] = useState("")
  useEffect(()=> {
    setSocket(io("http://localhost:3000/"))
  }, [])
  const dispatch = useDispatch()
  
  if(!roomState) {
    const handleCreate = () => {
      socket.emit("create")
      setRoomState(socket.id)
    }

    const handleSubmit = (event) => {
      const room = event.target.code.value
      socket.emit("join", room)
      //dispatch(set(room)) // check if room exists first
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
