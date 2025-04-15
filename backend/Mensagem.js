class Mensagem {
    static TIPOS = {
        TEXTO: 'text',
        USER_ID: 'user_id',
        USER_JOIN: 'user_join',
        USER_LEAVE: 'user_leave'
    };

    constructor(tipo, conteudo, remetente = null) {
        this.tipo = tipo;
        this.conteudo = conteudo;
        this.remetente = remetente;
        this.timestamp = new Date().toISOString();
    }

    toJSON() {
        const json = {
            type: this.tipo,
            content: this.conteudo,
            timestamp: this.timestamp,
            sender: this.remetente
        };

        return json;
    }

    static criarMensagemTexto(conteudo, remetente) {
        return new Mensagem(Mensagem.TIPOS.TEXTO, conteudo, remetente);
    }

    static criarMensagemUserId(userId) {
        return new Mensagem(Mensagem.TIPOS.USER_ID, userId);
    }

    static criarMensagemUserJoin(userId) {
        return new Mensagem(Mensagem.TIPOS.USER_JOIN, `Usuário ${userId} entrou no chat.`);
    }

    static criarMensagemUserLeave(userId) {
        return new Mensagem(Mensagem.TIPOS.USER_LEAVE, `Usuário ${userId} saiu do chat.`);
    }
}

export default Mensagem;
