

function Message({message, sender, time}) {


    return(
        <div>
            <h5>{sender}:</h5>
            <p>{message}</p>
            {time}
        </div>
    )
}

export default Message