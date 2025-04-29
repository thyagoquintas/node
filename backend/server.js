import { WebSocketServer } from 'ws';
import http from 'http';
import { v4 as uuidv4 } from 'uuid';

const server = http.createServer();
const wss = new WebSocketServer({ server });

const canvasState = [];
const userColors = [];

function getRandomColor() {
  const colors = [
    '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399'
  ];
  
  return colors[Math.floor(Math.random() * colors.length)];
}

function setUserColor(userId, color) {
  userColors.push({ userId, color });
}

function getUserColor(userId) {
  const userEntry = userColors.find(entry => entry.userId === userId);
  return userEntry ? userEntry.color : null;
}

function deleteUserColor(userId) {
  const index = userColors.findIndex(entry => entry.userId === userId);
  if (index !== -1) {
    userColors.splice(index, 1);
  }
}

function broadcast(data, exclude = null) {
  wss.clients.forEach(client => {
    if (client !== exclude && client.readyState === 1) {
      client.send(JSON.stringify(data));
    }
  });
}

wss.on('connection', (ws) => {
  console.log('Novo cliente conectado');
  
  const userId = uuidv4().slice(0, 8);
  const userColor = getRandomColor();
  setUserColor(userId, userColor);
  
  ws.send(JSON.stringify({
    type: 'init',
    userId,
    color: userColor
  }));
  
  ws.send(JSON.stringify({
    type: 'canvasState',
    state: canvasState
  }));
  
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      console.log('Mensagem recebida:', data);
      
      if (data.type === 'draw') {
        canvasState.push({
          userId: data.userId,
          color: getUserColor(data.userId),
          x: data.x,
          y: data.y,
          prevX: data.prevX,
          prevY: data.prevY
        });
        
        broadcast({
          type: 'draw',
          userId: data.userId,
          color: getUserColor(data.userId),
          x: data.x,
          y: data.y,
          prevX: data.prevX,
          prevY: data.prevY
        });

      } else if (data.type === 'clear') {
        canvasState.splice(0);
        broadcast({ type: 'clear' });
      }

    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
    }
  });
  
  ws.on('close', () => {
    console.log(`Cliente ${userId} desconectado`);
    deleteUserColor(userId);
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Servidor WebSocket rodando na porta ${PORT}`);
});
