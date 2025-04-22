import { useState, useEffect, useRef } from 'react'
import MessageList from './components/MessageList'
import ChatInput from './components/ChatInput'
import useWebSocket from './hooks/useWebSocket'

function App() {
  const [inputMessage, setInputMessage] = useState('')
  const { messages, userId, connected, sendMessage: sendWebSocketMessage } = useWebSocket()
  const chatMessagesRef = useRef(null)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = () => {
    const content = inputMessage.trim()
    if (sendWebSocketMessage(content)) {
      setInputMessage('')
    }
  }

  return (
    <div className="chat-container">
      <MessageList 
        messages={messages}
        userId={userId}
        formatDate={formatDate}
        chatMessagesRef={chatMessagesRef}
      />
      <ChatInput 
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        sendMessage={sendMessage}
        connected={connected}
      />
    </div>
  )
}

export default App
