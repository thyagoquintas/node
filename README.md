# Chat em Tempo Real - Multi-implementação com Node.js, JavaScript e React

Este projeto demonstra diferentes abordagens para implementar um chat em tempo real, utilizando WebSockets para comunicação bidirecional. O projeto contém três implementações diferentes:

- **Backend**: Servidor WebSocket Node.js comum a todas implementações
- **Frontend**: Implementação vanilla JavaScript
- **React**: Implementação moderna usando React

> Para detalhes sobre o backend e frontend vanilla JavaScript, consulte a branch aula-08.

## Implementação React

### Estrutura do Projeto React

```
react/
├── src/
│   ├── components/       # Componentes React reutilizáveis
│   │   ├── ChatInput.jsx    # Componente de entrada de mensagens
│   │   ├── Message.jsx      # Componente para renderizar mensagens
│   │   └── MessageList.jsx  # Lista de mensagens do chat
│   ├── hooks/           # Custom hooks React
│   │   └── useWebSocket.js  # Hook para gerenciar conexão WebSocket
│   ├── App.jsx         # Componente principal
│   ├── main.jsx        # Ponto de entrada da aplicação
│   └── App.css         # Estilos principais
├── public/
└── index.html
```

### Componentes Principais

#### App.jsx
Componente raiz que organiza a estrutura principal do chat, gerenciando o estado das mensagens e a conexão WebSocket.

#### MessageList
Componente responsável por renderizar a lista de mensagens, lidando com diferentes tipos de mensagens (texto, sistema, etc).

#### Message
Componente que renderiza uma mensagem individual, com suporte para diferentes tipos e estilos de mensagens.

#### ChatInput
Componente de entrada que gerencia a digitação e envio de novas mensagens.

### Custom Hooks

#### useWebSocket
Hook personalizado que encapsula toda a lógica de conexão WebSocket, incluindo:
- Estabelecimento de conexão
- Gerenciamento de estado de conexão
- Tratamento de mensagens
- Reconexão automática
- Envio de mensagens

### Funcionalidades

- Suporte a diferentes tipos de mensagens (texto, sistema)
- Reconexão automática em caso de perda de conexão
- Formatação de timestamps
- Diferenciação visual entre mensagens próprias e de outros usuários
- Suporte a mensagens do sistema (entrada/saída de usuários)

### Iniciando o Projeto React

1. Instale as dependências:
```bash
cd react
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

3. Acesse a aplicação em `http://localhost:5173`

> Nota: Certifique-se de que o backend está rodando em `ws://localhost:3000` antes de iniciar o frontend.

### Diferenças da Implementação React

Comparada à implementação vanilla JavaScript, a versão React oferece:

1. **Componentização**: Código mais organizado e reutilizável
2. **Gerenciamento de Estado**: Uso eficiente do estado com hooks React
3. **Performance**: Renderização otimizada com Virtual DOM
4. **Manutenibilidade**: Estrutura de projeto mais escalável

## Próximos Passos

O projeto está preparado para receber as mesmas melhorias propostas nos exercícios da implementação vanilla:
- Implementação de salas de chat
- Perfis de usuário
- Mensagens privadas