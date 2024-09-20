"use client";
import React, { useState } from "react";
import TodoItem from "./TodoItem";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const filteredTodos = initialTodos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div>
      <div>
        <button
          onClick={() => setFilter("all")}
          className={`mr-2 ${filter === "all" ? "font-bold" : ""}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`mr-2 ${filter === "active" ? "font-bold" : ""}`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`mr-2 ${filter === "completed" ? "font-bold" : ""}`}
        >
          Completed
        </button>
      </div>
      <ul>
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}
