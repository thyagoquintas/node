const ChatInput = ({ inputMessage, setInputMessage, sendMessage, connected }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  return (
    <div className="chat-input-container">
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Digite sua mensagem..."
        disabled={!connected}
        autoComplete="off"
      />
      <button
        onClick={sendMessage}
        disabled={!connected}
      >
        Enviar
      </button>
    </div>
  )
}

export default ChatInput
