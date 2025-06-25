"use client";
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';

type Todo = { id: string; text: string; completed: boolean };

export default function TodoList({ refresh }: { refresh: number }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchTodos() {
    setLoading(true);
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchTodos();
  }, [refresh]);

  async function deleteTodo(id: string) {
    const res = await fetch("/api/todos", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      toast.success("Task deleted!");
      fetchTodos();
    } else {
      toast.error("Failed to delete task");
    }
  }

  async function toggleTodo(id: string, completed: boolean) {
    const res = await fetch("/api/todos", {
      method: "PUT",
      body: JSON.stringify({ id, completed: !completed }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      toast.success("Task updated!");
      fetchTodos();
    } else {
      toast.error("Failed to update task");
    }
  }

  if (loading) return <p style={{ color: "#f6eaea" }}>Loading...</p>;
  if (todos.length === 0)
    return <p style={{ color: "#b8b8b8" }}>No tasks to show.</p>;

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className="todo-item">
          <span
            style={
              todo.completed
                ? { textDecoration: "line-through", opacity: 0.6 }
                : {}
            }
          >
            {todo.text}
          </span>
          <div className="todo-actions">
            <button
              className="todo-action-btn"
              title="Toggle Complete"
              onClick={() => toggleTodo(todo.id, todo.completed)}
            >
              ✔️
            </button>
            <button
              className="todo-action-btn"
              title="Delete"
              onClick={() => deleteTodo(todo.id)}
            >
              🗑️
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
