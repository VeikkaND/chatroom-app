import { io } from "socket.io-client"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { set } from "./reducers/roomReducer"
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

    const handleSubmit = async (event) => {
      event.preventDefault()
      const room = event.target.code.value
      const res = await socket.emitWithAck("join", room)
      if(res) {
        dispatch(set(room))
        console.log(`joining room ${room}`)
        setRoomState(room)
      } else {
        console.log(`room ${room} not found`)
      }
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
