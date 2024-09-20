import Image from "next/image";
import AddTodoForm from "./components/AddTodoForm";
import { getTodos } from "./actions";
import TodoList from "./components/TodoList";
import { Suspense } from "react";

async function Todos() {
  const todos = await getTodos();
  return <TodoList initialTodos={todos} />;
}

export default function Home() {
  return (
    <main className="h-screen mx-auto max-w-md justify-center flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <AddTodoForm />
      <Suspense fallback={<div>Loding...</div>}>
        <Todos />
      </Suspense>
    </main>
  );
}
