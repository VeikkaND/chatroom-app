

function Message({message, sender}) {


    return(
        <div>
            <h5>{sender}:</h5>
            <p>{message}</p>
        </div>
    )
}

export default Message