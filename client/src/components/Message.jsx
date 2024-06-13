

function Message({message, sender, time, username}) {


    return(
        <div className={sender === username ? "message_own" : "message_other"}>
            {sender !== username && <h5 id="sender">{sender}:</h5>}
            <div id="bubble">
                <p id="text">{message}</p>
                <p id="timestamp">{time}</p>
            </div>
        </div>
    )
}

export default Message