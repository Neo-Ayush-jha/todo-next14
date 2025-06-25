'use client';
import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import LiveClock from './components/LiveClock';

export default function Home() {
  const [refresh, setRefresh] = useState(0);
  const [typedTitle, setTypedTitle] = useState('');
  const fullText = 'My Todo List';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedTitle(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <main style={{ maxWidth: 600, margin: '0 auto', padding: '3rem 1rem' }}>
      <h1 style={{
        fontSize: '4rem',
        color: '#f6eaea',
        textAlign: 'center',
        fontWeight: 700,
        marginBottom: '2rem',
        letterSpacing: '0.05em'
      }}>
        {typedTitle}
      </h1>

      <TodoForm onAdd={() => setRefresh(r => r + 1)} />
      <LiveClock />
      <TodoList refresh={refresh} />
    </main>
  );
}