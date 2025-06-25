import { NextRequest, NextResponse } from 'next/server';

type Todo = { id: string; text: string; completed: boolean };
let todos: Todo[] = [];

export async function GET() {
  return NextResponse.json(todos);
}

export async function POST(req: NextRequest) {
  const { text } = await req.json();
  if (!text || typeof text !== 'string' || !text.trim()) {
    return NextResponse.json({ error: 'Text is required' }, { status: 400 });
  }
  const newTodo: Todo = { id: Date.now().toString(), text: text.trim(), completed: false };
  todos.unshift(newTodo);
  return NextResponse.json(newTodo, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const { id, completed } = await req.json();
  const todo = todos.find((t) => t.id === id);
  if (!todo) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  todo.completed = !!completed;
  return NextResponse.json(todo);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  todos = todos.filter((t) => t.id !== id);
  return NextResponse.json({ success: true });
}