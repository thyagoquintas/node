import { useState, useEffect, useRef } from 'react'
import MessageList from './components/MessageList'
import ChatInput from './components/ChatInput'

function App() {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [userId, setUserId] = useState(null)
  const [connected, setConnected] = useState(false)
  const socketRef = useRef(null)
  const chatMessagesRef = useRef(null)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const connect = () => {
    socketRef.current = new WebSocket('ws://localhost:3000')

    socketRef.current.onopen = () => {
      setConnected(true)
    }

    socketRef.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data)
        if (message.type === 'user_id') {
          setUserId(message.content)
          console.log(`Conectado como: ${message.content}`)
        } else {
          setMessages(prev => [...prev, message])
        }
      } catch (error) {
        console.error('Erro ao processar mensagem recebida:', error)
      }
    }

    socketRef.current.onclose = () => {
      setConnected(false)
      setTimeout(connect, 3000)
    }

    socketRef.current.onerror = (error) => {
      console.error('Erro na conexão WebSocket:', error)
    }
  }

  useEffect(() => {
    connect()
    return () => {
      if (socketRef.current) {
        socketRef.current.close()
      }
    }
  }, [])

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = () => {
    const content = inputMessage.trim()
    if (content && connected && socketRef.current) {
      const message = {
        content: content,
        type: 'text'
      }
      socketRef.current.send(JSON.stringify(message))
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
