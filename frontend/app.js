const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.getElementById('chat-messages');

let socket;
let userId;
let connected = false;

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function addMessage(message) {
    const messageElement = document.createElement('div');
    const time = formatDate(message.timestamp);
    
    switch (message.type) {
        case 'text':
            if (message.sender === userId) {
                messageElement.className = 'message message-self';
                messageElement.innerHTML = `
                    <div class="message-content">${message.content}</div>
                    <div class="message-time">${time}</div>
                `;
            } else {
                messageElement.className = 'message message-other';
                messageElement.innerHTML = `
                    <div class="message-header">${message.sender}</div>
                    <div class="message-content">${message.content}</div>
                    <div class="message-time">${time}</div>
                `;
            }
            break;
        
        case 'user_join':
        case 'user_leave':
            messageElement.className = 'message-system';
            messageElement.textContent = message.content;
            break;
            
        case 'user_id':
            userId = message.content;
            console.log(`Conectado como: ${userId}`);
            return;
    }
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
    const content = messageInput.value.trim();
    if (content && connected) {
        const message = {
            content: content,
            type: 'text'
        };
        socket.send(JSON.stringify(message));
        messageInput.value = '';
    }
}

//Adicionando as funções de clique e tecla
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function connect() {
    socket = new WebSocket('ws://localhost:3000');
    
    socket.onopen = () => {
        connected = true;
        messageInput.disabled = false;
        sendButton.disabled = false;
    };
    
    socket.onmessage = (event) => {
        try {
            const message = JSON.parse(event.data);
            addMessage(message);
        } catch (error) {
            console.error('Erro ao processar mensagem recebida:', error);
        }
    };
    
    socket.onclose = () => {
        connected = false;
        messageInput.disabled = true;
        sendButton.disabled = true;
        
        //Tenta reconectar após 3 segundos
        setTimeout(connect, 3000);
    };
    
    socket.onerror = (error) => {
        console.error('Erro na conexão WebSocket:', error);
    };
}

messageInput.disabled = true;
sendButton.disabled = true;
connect();
