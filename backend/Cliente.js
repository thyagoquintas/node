import { v4 as uuidv4 } from 'uuid';
import Mensagem from './Mensagem.js';

class Cliente {
    constructor(ws) {
        this.ws = ws;
        this.userId = uuidv4().slice(0, 8);
        this.connected = true;
        this.enviarMensagem(Mensagem.criarMensagemUserId(this.userId));
    }

    enviarMensagem(mensagem) {
        const dados = mensagem instanceof Mensagem ? mensagem.toJSON() : mensagem;
        this.ws.send(JSON.stringify(dados));
    }

    desconectar() {
        this.connected = false;
        this.ws.close();
    }
}

export default Cliente;
