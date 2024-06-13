

function Message({message, sender, time}) {


    return(
        <div className="message">
            <h5 id="sender">{sender}:</h5>
            <div id="bubble">
                <p id="text">{message}</p>
                <p id="timestamp">{time}</p>
            </div>
        </div>
    )
}

export default Message