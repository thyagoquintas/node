import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import Cliente from './Cliente.js';
import Mensagem from './Mensagem.js';

const server = createServer();
const wss = new WebSocketServer({ server });
const clients = [];

const broadcast = (data) => {
    clients.forEach(client => {
        client.enviarMensagem(data);
    });
};

wss.on('connection', (ws) => {
    const cliente = new Cliente(ws);
    clients.push(cliente);
    console.log(`Novo cliente conectado: ${cliente.userId}`);

    broadcast(Mensagem.criarMensagemUserJoin(cliente.userId));
    
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            broadcast(Mensagem.criarMensagemTexto(data.content, cliente.userId));
        } catch (e) {
            console.error('Erro ao processar mensagem:', e);
        }
    });

    ws.on('close', () => {
        const index = clients.findIndex(client => client.userId === cliente.userId);
        if (index !== -1) {
            clients.splice(index, 1);
        }
        broadcast(Mensagem.criarMensagemUserLeave(cliente.userId));
        console.log(`Cliente desconectado: ${cliente.userId}`);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor WebSocket rodando em ws://localhost:${PORT}`);
});
