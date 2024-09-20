// @ts-nocheck
"use client";
import React, { startTransition, useTransition } from "react";
import { deleteTodo, updateTodo } from "../actions";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type TodoItemProps = {
  todo: Todo;
};
export default function TodoItem({ todo }: TodoItemProps) {
  const [isPending, StartTransition] = useTransition();
  console.log("tods", todo);

  const handleToggle = () => {
    startTransition(() => updateTodo(todo.id, { completed: !todo.completed }));
  };

  const handleDelete = () => {
    startTransition(() => deleteTodo(todo.id));
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        className="mr-2"
        disabled={isPending}
      />
      <span className={todo.completed ? "line-through" : " "}>
        {todo.title}
      </span>
      <button
        onClick={handleDelete}
        className="text-red-500"
        disabled={isPending}
      >
        Delete
      </button>
    </li>
  );
}
