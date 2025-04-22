const Message = ({ message, userId, formatDate }) => {
  const time = formatDate(message.timestamp)

  switch (message.type) {
    case 'text':
      if (message.sender === userId) {
        return (
          <div className="message message-self">
            <div className="message-content">{message.content}</div>
            <div className="message-time">{time}</div>
          </div>
        )
      }
      return (
        <div className="message message-other">
          <div className="message-header">{message.sender}</div>
          <div className="message-content">{message.content}</div>
          <div className="message-time">{time}</div>
        </div>
      )
    case 'user_join':
    case 'user_leave':
      return (
        <div className="message-system">
          {message.content}
        </div>
      )
    default:
      return null
  }
}

export default Message
