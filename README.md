# Chat em Tempo Real - Aplicação Node.js com WebSockets

Este projeto consiste em uma aplicação web para troca de mensagens em tempo real entre usuários, construída com Node.js no backend e JavaScript puro no frontend, utilizando a tecnologia WebSockets para comunicação bidirecional.

## Estrutura do Projeto

O projeto está organizado em duas partes principais:

```
/backend        # Servidor WebSocket com Node.js
/frontend       # Interface do usuário em HTML, CSS e JavaScript
```

## Backend

### Principais Componentes

O backend é construído usando Node.js com a biblioteca WebSocket (ws) para trabalhar nacomunicação em tempo real entre os clientes conectados.

#### Arquivos Principais

- `server.js` - Ponto de entrada da aplicação, configura o servidor WebSocket e gerencia conexões
- `Cliente.js` - Classe para representar e gerenciar cada cliente conectado
- `Mensagem.js` - Classe para padronizar a estrutura das mensagens trocadas

### Como Funciona o Servidor WebSocket

O arquivo `server.js` é o servidor do backend, onde:

1. **Inicialização do Servidor**:
   - Cria um servidor HTTP básico
   - Inicializa um servidor WebSocket que "escuta" este servidor HTTP
   - Mantém uma lista de clientes conectados em memória

2. **Gerenciamento de Conexões**:
   - Cada nova conexão é registrada como um objeto `Cliente`
   - Monitora eventos de mensagens e desconexões
   - Transmite (broadcast) mensagens para todos os clientes conectados

3. **Tratamento de Eventos**:
   - `connection`: Quando um novo cliente se conecta
   - `message`: Quando uma mensagem é recebida de um cliente
   - `close`: Quando um cliente se desconecta

### Modelo de Cliente

O arquivo `Cliente.js` define um modelo que:

- Gera um ID único para cada cliente conectado usando UUID
- Gerencia o estado da conexão WebSocket
- Fornece métodos para envio de mensagens para o cliente

### Estrutura de Mensagens

O arquivo `Mensagem.js` define uma classe para padronização das mensagens:

- Define diferentes tipos de mensagens: texto, identificação, entrada e saída de usuários
- Formata as mensagens em formato JSON para transmissão
- Inclui metadados como timestamp e remetente
- Fornece métodos estáticos para criação facilitada dos diferentes tipos de mensagens

### Exemplo de Fluxo de Dados no Backend:

1. Cliente se conecta → `server.js` registra a conexão e cria um objeto `Cliente`
2. Uma mensagem de "usuário entrou" é enviada a todos os clientes
3. Cliente envia uma mensagem → `server.js` recebe, processa com `Mensagem.js` e distribui para todos
4. Cliente se desconecta → `server.js` remove da lista e notifica os demais

## Frontend

### Estrutura da Interface

O frontend é desenvolvido com tecnologias web padrão:

- **HTML** (`index.html`): define a estrutura básica da interface do chat
- **CSS** (`styles.css`): estiliza a interface para melhor experiência do usuário
- **JavaScript** (`app.js`): gerencia a lógica de conexão e interatividade

### Componentes do Aplicativo

1. **Painel de Mensagens**:
   - Exibe todas as mensagens recebidas
   - Diferencia visualmente mensagens do próprio usuário, de outros usuários e mensagens do sistema
   - Rolagem automática para a mensagem mais recente

2. **Campo de Entrada**:
   - Input para digitar novas mensagens
   - Botão para envio
   - Suporte para envio por tecla Enter

### Lógica de Conexão WebSocket

O arquivo `app.js` implementa a lógica para:

- Estabelecer conexão com o servidor WebSocket
- Processar mensagens recebidas e exibi-las na interface
- Capturar as mensagens digitadas pelo usuário e enviá-las ao servidor
- Reconectar automaticamente em caso de falha na conexão
- Formatar timestamps e organizar visualmente os diferentes tipos de mensagem

### Fluxo de Interação no Frontend:

1. Página carrega → WebSocket conecta ao servidor → Recebe ID único
2. Usuário digita mensagem → Clica em Enviar → WebSocket envia ao servidor
3. Servidor processa e redistribui → WebSocket recebe → Interface atualiza
4. Perda de conexão → Tenta reconectar automaticamente a cada 3 segundos

## Execução do Projeto

### Iniciando o Backend

```bash
cd backend
npm install
npm start
```

O servidor estará rodando no endereço `ws://localhost:3000`.

### Iniciando o Frontend

Simplesmente abra o arquivo `index.html` em um navegador web moderno. Para uma experiência completa, abra múltiplas janelas para simular diferentes usuários conversando entre si.

## Conceitos Fundamentais Aplicados

1. **WebSockets**: protocolo de comunicação bidirecional sobre uma única conexão TCP
2. **Orientação a Objetos**: uso de classes e encapsulamento para organizar o código
3. **Gerenciamento de Estado**: controle do estado da aplicação entre múltiplos clientes
4. **Broadcast**: envio de mensagens para múltiplos destinatários
5. **Comunicação Assíncrona**: tratamento de eventos e promises
6. **UUIDs**: geração de identificadores únicos para clientes

## Exercício Final

**Implementação de Funcionalidades Avançadas para o Chat**

Como exercício final, você deve implementar uma ou mais das seguintes funcionalidades:

### Execício 1: Salas de Chat

Modifique o sistema para suportar diferentes salas de chat:

1. Altere o backend para:
   - Criar um modelo `Sala.js` que gerencia um conjunto de clientes
   - Modificar o `server.js` para gerenciar múltiplas salas
   - Adicionar comandos para criar, entrar e sair de salas

2. Adapte o frontend para:
   - Exibir uma lista de salas disponíveis
   - Permitir entrada/saída de salas
   - Mostrar apenas mensagens da sala atual

### Execício 2: Perfis de Usuário

Melhore a experiência de usuário com perfis personalizáveis:

1. Altere o backend para:
   - Expandir a classe `Cliente` para incluir nome, avatar e status
   - Adicionar persistência de perfis usando arquivos JSON e localstorage

2. Expanda o frontend para:
   - Adicionar tela inicial para definir nome e avatar
   - Exibir avatares e nomes nas mensagens

### Execício 3: Mensagens Privadas

Implemente a capacidade de enviar mensagens privadas entre usuários:

1. No backend:
   - Adicione um novo tipo de mensagem em `Mensagem.js` para mensagens privadas
   - Modifique a lógica de broadcast em `server.js` para enviar algumas mensagens apenas para destinatários específicos

2. No frontend:
   - Adicione interface para selecionar um usuário para mensagem privada
   - Implemente visualização diferenciada para mensagens privadas
   - Permita alternar entre visualização de chat geral e conversas privadas