# Canvas Compartilhado em Tempo Real

Este projeto demonstra a implementação de uma aplicação de desenho colaborativo em tempo real, utilizando WebSockets para comunicação bidirecional. O sistema permite que múltiplos usuários conectados desenhem em um canvas compartilhado simultaneamente, com cada usuário identificado por uma cor única.

## Estrutura do Projeto

O projeto está organizado em duas partes principais:

- **Backend**: Servidor WebSocket Node.js 
- **Frontend**: Aplicação React com canvas interativo

## Backend

O backend é um servidor WebSocket simples construído com Node.js que gerencia as conexões dos clientes e sincroniza o estado do canvas entre todos os usuários conectados.

### Funcionalidades

- Gerenciamento de conexões de usuários
- Atribuição de cores únicas para cada usuário
- Sincronização do estado do canvas entre todos os clientes
- Transmissão de eventos de desenho em tempo real
- Limpeza do canvas para todos os usuários conectados

### Como Executar

1. Instale as dependências:
```bash
cd backend
npm install
```

2. Inicie o servidor:
```bash
node server.js
```

3. O servidor WebSocket estará rodando na porta 8080.

## Frontend (React)

O frontend é uma aplicação React que fornece a interface do usuário para o canvas compartilhado.

### Componentes Principais

#### Canvas
Componente principal que gerencia:
- Conexão WebSocket com o servidor
- Estado do desenho
- Eventos de mouse para desenhar
- Renderização de linhas desenhadas por outros usuários

### Sistema de Desenho

O sistema de desenho utiliza a API Canvas do HTML5 e implementa um mecanismo de desenho baseado em eventos de mouse. Aqui está como ele funciona:

1. **Captura de eventos do mouse**: O componente Canvas captura três principais eventos:
   - `onMouseDown`: Inicia o desenho quando o usuário pressiona o botão do mouse
   - `onMouseMove`: Registra o movimento do mouse e desenha linhas enquanto o botão está pressionado
   - `onMouseUp`/`onMouseOut`: Finaliza o desenho quando o botão é solto ou o mouse sai da área

2. **Desenho de linhas**: A função `drawLine` cria linhas suaves entre dois pontos no canvas:
   ```javascript
   const drawLine = (context, x1, y1, x2, y2, color) => {
     context.beginPath();
     context.strokeStyle = color;
     context.lineWidth = 3;
     context.lineCap = 'round';
     context.moveTo(x1, y1);
     context.lineTo(x2, y2);
     context.stroke();
   };
   ```

3. **Comunicação com o servidor**: Cada movimento do mouse durante o desenho gera uma mensagem WebSocket que é enviada ao servidor com as coordenadas:
   ```javascript
   {
     type: 'draw',
     userId: 'abc123',  //ID único do usuário
     prevX: 100,        //Posição anterior X
     prevY: 150,        //Posição anterior Y
     x: 110,            //Posição atual X
     y: 155             //Posição atual Y
   }
   ```

4. **Renderização de desenhos remotos**: Quando o servidor retransmite desenhos de outros usuários, o mesmo método `drawLine` é usado para renderizar as linhas no canvas local, proporcionando a experiência colaborativa em tempo real.

### Funcionalidades

- Interface para desenho
- Atualização em tempo real dos desenhos de outros usuários
- Identificação visual por cores únicas para cada usuário
- Botão para limpar o canvas para todos os usuários

### Como Executar

1. Instale as dependências:
```bash
cd frontend
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

3. Acesse a aplicação em `http://localhost:5173`

> Nota: Certifique-se de que o backend está rodando em `ws://localhost:8080` antes de iniciar o frontend.

## Como Utilizar

1. Abra a aplicação em seu navegador
2. Você receberá automaticamente uma cor única para identificá-lo
3. Desenhe no canvas usando o mouse
4. Observe em tempo real os desenhos de outros usuários conectados
5. Use o botão "Limpar Canvas" para resetar o desenho para todos

## Desafios

### Desafio 1: Implementar Ferramenta de Seleção de Cores
Adicione uma funcionalidade que permita aos usuários escolherem suas próprias cores para desenhar, em vez de receberem cores aleatórias do servidor.

**Dicas:**
- Adicione um seletor de cores no componente Canvas do frontend
- Modifique o protocolo de mensagens para incluir a cor selecionada pelo usuário
- Atualize o servidor para respeitar a escolha de cor do usuário

### Desafio 2: Adicionar Funcionalidade de Salas de Desenho
Implemente salas separadas para que grupos diferentes de usuários possam desenhar em canvases isolados.

**Dicas:**
- Adicione um sistema de identificação de salas no backend
- Crie uma interface para escolher ou criar salas no frontend
- Modifique a lógica de broadcast para enviar mensagens apenas para usuários na mesma sala

### Desafio 3: Implementar Diferentes Ferramentas de Desenho
Adicione suporte a diferentes ferramentas como pincéis de tamanhos variados, formas geométricas (círculos, retângulos) e ferramenta de texto.

**Dicas:**
- Adicione uma barra de ferramentas no frontend
- Modifique o protocolo de mensagens para incluir o tipo de ferramenta e seus parâmetros
- Implemente as diferentes funções de desenho no canvas para cada ferramenta
- Atualize o servidor para processar e armazenar esses novos tipos de eventos de desenho
