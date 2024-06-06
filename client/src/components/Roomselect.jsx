import { useDispatch } from "react-redux"

function Roomselect({socket}) {
    const dispatch = useDispatch()

    const handleCreate = () => {
        socket.emit("create")
    }

    const handleSubmit = (event) => {
        const room = event.target.code.value
        dispatch()
    }

    return(
        <div>
            <button onClick={handleCreate}>create room</button>
            <form onSubmit={handleSubmit}>
                <input name="code"></input>
                <button type="submit">join</button>
            </form>
        </div>
    )
}

export default Roomselect