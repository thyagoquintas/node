import React from 'react'
import Canvas from './components/Canvas';
import './App.css';

function App() {
  return (
    <div className="app">
      <header>
        <h1>Canvas Compartilhado</h1>
      </header>
      <main>
        <Canvas />
      </main>
    </div>
  );
}

export default App;
