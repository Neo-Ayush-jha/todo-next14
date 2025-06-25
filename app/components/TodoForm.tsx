'use client';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function TodoForm({ onAdd }: { onAdd: () => void }) {
  const [text, setText] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) {
      toast.error('Task cannot be empty');
      return;
    }
    const res = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ text }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      setText('');
      toast.success('Task added!');
      onAdd();
    } else {
      const data = await res.json();
      toast.error(data.error || 'Failed to add');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="todo-input-container">
      <input
        className="todo-input"
        placeholder="Add a task."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="todo-btn" type="submit">
        I Got This!
      </button>
    </form>
  );
}