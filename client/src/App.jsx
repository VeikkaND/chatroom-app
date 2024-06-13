import { useDispatch } from "react-redux"
import { useContext, useState } from "react"
import SocketContext from "./utils/SocketContext"
import { setName } from "./reducers/nameReducer"
import { useNavigate } from "react-router-dom"

function App() {
  const [username, setUsername] = useState(false)
  const socket = useContext(SocketContext)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleCreate = () => {
    socket.emit("create", username)
    navigate(`/${socket.id}`)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const room = event.target.code.value
    const res = await socket.emitWithAck("join", {room: room, name: username})
    if(res) {
      console.log(`joining room ${room}`)
      navigate(`/${room}`)
    } else {
      console.log(`room ${room} not found`)
    }
  }

  const handleUsername = (event) => {
    const name = event.target.username.value
    dispatch(setName(name))
    setUsername(name)
  }

  if(!username) {
    return (
      <div>
        <form onSubmit={handleUsername}>
          <input name="username"></input>
          <button type="submit">enter</button>
        </form>
      </div>
    )
  } else {
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

  
} 

export default App
