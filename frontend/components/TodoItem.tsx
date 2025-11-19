'use client';

import { Todo } from '@/types/todo';
import { updateTodo, deleteTodo } from '@/lib/api';

interface TodoItemProps {
  todo: Todo;
  onUpdate: () => void;
}

export default function TodoItem({ todo, onUpdate }: TodoItemProps) {
  const handleToggleComplete = async () => {
    try {
      await updateTodo(todo.id, { completed: !todo.completed });
      onUpdate();
    } catch (error) {
      console.error('Failed to update todo:', error);
      alert('Failed to update todo');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this todo?')) {
      return;
    }
    try {
      await deleteTodo(todo.id);
      onUpdate();
    } catch (error) {
      console.error('Failed to delete todo:', error);
      alert('Failed to delete todo');
    }
  };

  return (
    <div
      className={`flex justify-between items-center p-4 mb-2 bg-white border border-gray-200 rounded-lg transition-all hover:shadow-md ${
        todo.completed ? 'opacity-70' : ''
      }`}
    >
      <div className="flex items-start gap-4 flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
          className="w-5 h-5 mt-0.5 cursor-pointer"
        />
        <div className="flex-1">
          <h3
            className={`text-lg mb-1 text-gray-800 ${
              todo.completed ? 'line-through text-gray-500' : ''
            }`}
          >
            {todo.title}
          </h3>
          {todo.description && (
            <p
              className={`text-sm text-gray-600 ${
                todo.completed ? 'line-through text-gray-400' : ''
              }`}
            >
              {todo.description}
            </p>
          )}
        </div>
      </div>
      <button
        onClick={handleDelete}
        className="px-4 py-2 bg-red-500 text-white rounded-md text-sm transition-colors hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
}

