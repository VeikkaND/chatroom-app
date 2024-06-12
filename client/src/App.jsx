import { useDispatch } from "react-redux"
import { useContext } from "react"
import SocketContext from "./utils/SocketContext"
import { setRoom } from "./reducers/roomReducer"
import { useNavigate } from "react-router-dom"

function App() {
  const socket = useContext(SocketContext)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleCreate = () => {
    socket.emit("create")
    dispatch(setRoom(socket.id))
    console.log("redirecting")
    navigate(`/${socket.id}`)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const room = event.target.code.value
    const res = await socket.emitWithAck("join", room)
    if(res) {
      dispatch(setRoom(room))
      console.log(`joining room ${room}`)
      navigate(`/${room}`)
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
  } 

export default App
