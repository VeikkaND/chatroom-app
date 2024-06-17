import { useDispatch, useSelector } from "react-redux"
import { useContext, useState } from "react"
import SocketContext from "./utils/SocketContext"
import { setName } from "./reducers/nameReducer"
import { useNavigate } from "react-router-dom"

function App() {
  const [username, setUsername] = useState(useSelector((state) => state.name.value))
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
      <div className="app">
        <form onSubmit={handleUsername}>
          <h2>Username:</h2>
          <input name="username" autoComplete="off"></input>
          <br />
          <button type="submit">enter</button>
        </form>
      </div>
    )
  } else {
    return (
      <div className="app">
        <h1>Hello {username}👋</h1>
        <div id="options">
          <div id="box">
            <h2>Create a new room</h2>
            <button onClick={handleCreate}>create room</button>
          </div>
          <div id="box"> 
            <h2>Join an existing room</h2>
            <form onSubmit={handleSubmit}>
              <input name="code" autoComplete="off"></input>
              <br />
              <button type="submit">join</button>
            </form>
          </div>
        </div>
        
        
      </div>
    )
  }

  
} 

export default App
