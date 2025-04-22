import Message from './Message'

const MessageList = ({ messages, userId, formatDate, chatMessagesRef }) => {
  return (
    <div ref={chatMessagesRef} className="chat-messages">
      {messages.map((message, index) => (
        <Message 
          key={index} 
          message={message} 
          userId={userId} 
          formatDate={formatDate}
        />
      ))}
    </div>
  )
}

export default MessageList
