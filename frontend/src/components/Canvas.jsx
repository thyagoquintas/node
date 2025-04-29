import React from 'react'
import { useState, useEffect, useRef } from 'react';
import './Canvas.css';

const Canvas = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [userId, setUserId] = useState(null);
  const [color, setColor] = useState('#000000');
  const [ws, setWs] = useState(null);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8080');
    
    websocket.onopen = () => {
      console.log('Conectado ao servidor WebSocket');
    };
    
    websocket.onclose = () => {
      console.log('Desconectado do servidor WebSocket');
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      switch (data.type) {
        case 'init':
          setUserId(data.userId);
          setColor(data.color);
          break;
          
        case 'canvasState':
          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            data.state.forEach(item => {
              drawLine(ctx, item.prevX, item.prevY, item.x, item.y, item.color);
            });
          }
          break;
          
        case 'draw':
          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            drawLine(ctx, data.prevX, data.prevY, data.x, data.y, data.color);
          }
          break;
          
        case 'clear':
          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          }
          break;

        default:
          break;
      }
    };
    
    setWs(websocket);
    return () => {
      websocket.close();
    };
  }, []);

  //https://www.w3schools.com/graphics/canvas_lines.asp (Desenhando linhas no canvas)
  const drawLine = (context, x1, y1, x2, y2, color) => {
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = 3;
    context.lineCap = 'round';
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
  };

  //https://codepen.io/julio_ok/pen/ozpqGO (Desenhando no canvas)
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect(); //posição do canvas
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setDrawing(true);
    setLastPosition({ x, y });
  };

  const draw = (e) => {
    if (!drawing || !ws || !userId) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    drawLine(ctx, lastPosition.x, lastPosition.y, x, y, color);
    
    ws.send(JSON.stringify({
      type: 'draw',
      userId,
      prevX: lastPosition.x,
      prevY: lastPosition.y,
      x,
      y
    }));
    
    setLastPosition({ x, y });
  };

  const stopDrawing = () => {
    setDrawing(false);
  };

  //https://www.w3schools.com/tags/canvas_clearrect.asp limpando um canvas
  const clearCanvas = () => {
    if (ws && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ws.send(JSON.stringify({ type: 'clear' }));
    }
  };
  
  return (
    <div className="canvas-container">
      <div className="toolbar">
        <div className="user-info">
          {userId && (
            <div className="color-indicator" style={{ backgroundColor: color }}>
              Sua cor
            </div>
          )}
          <button onClick={clearCanvas}>Limpar Canvas</button>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onTouchEnd={stopDrawing}
        className="drawing-canvas"
      />
    </div>
  );
};

export default Canvas;
