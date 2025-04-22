import { useState, useRef, useEffect } from 'react'

const useWebSocket = () => {
  const [messages, setMessages] = useState([])
  const [userId, setUserId] = useState(null)
  const [connected, setConnected] = useState(false)
  const socketRef = useRef(null)

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

  const sendMessage = (content) => {
    if (content && connected && socketRef.current) {
      const message = {
        content: content,
        type: 'text'
      }
      socketRef.current.send(JSON.stringify(message))
      return true
    }
    return false
  }

  return {
    messages,
    userId,
    connected,
    sendMessage
  }
}

export default useWebSocket
