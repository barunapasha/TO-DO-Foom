'use client';

import { useState, FormEvent } from 'react';
import { CreateTodoInput } from '@/types/todo';
import { createTodo } from '@/lib/api';

interface TodoFormProps {
  onTodoAdded: () => void;
}

export default function TodoForm({ onTodoAdded }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Title is required');
      return;
    }

    setIsSubmitting(true);
    try {
      const input: CreateTodoInput = {
        title: title.trim(),
        description: description.trim() || undefined,
      };
      await createTodo(input);
      setTitle('');
      setDescription('');
      onTodoAdded();
    } catch (error) {
      console.error('Failed to create todo:', error);
      alert('Failed to create todo');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2 font-semibold text-gray-700">
          Title *
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title"
          disabled={isSubmitting}
          className="w-full px-3 py-3 border border-gray-300 rounded-md text-base font-sans transition-colors focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-2 font-semibold text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter todo description (optional)"
          disabled={isSubmitting}
          rows={3}
          className="w-full px-3 py-3 border border-gray-300 rounded-md text-base font-sans transition-colors focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-3 py-3 bg-blue-500 text-white rounded-md text-base font-semibold cursor-pointer transition-colors hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Adding...' : 'Add Todo'}
      </button>
    </form>
  );
}

