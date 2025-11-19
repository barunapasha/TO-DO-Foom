'use client';

import { useState, useEffect } from 'react';
import { Todo } from '@/types/todo';
import { fetchTodos } from '@/lib/api';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTodos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load todos');
      console.error('Error loading todos:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <main className="max-w-3xl mx-auto px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 text-gray-800">Todo Tracker</h1>
        <p className="text-lg text-gray-600">Manage your tasks efficiently</p>
      </div>

      <TodoForm onTodoAdded={loadTodos} />

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg mb-4 text-center">
          <p className="mb-2">Error: {error}</p>
          <button
            onClick={loadTodos}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8 text-gray-600">
          <p>Loading todos...</p>
        </div>
      ) : (
        <TodoList todos={todos} onUpdate={loadTodos} />
      )}
    </main>
  );
}

