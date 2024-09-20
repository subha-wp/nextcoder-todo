"use server";

import { v4 as uuidv4 } from "uuid";
import { getTodosFromStorage, saveTodosToStorage } from "./storage";
import { revalidatePath } from "next/cache";

export async function getTodos() {
  return getTodosFromStorage();
}

export async function addTodo(title: string) {
  const todos = await getTodosFromStorage();
  const newTodo = { id: uuidv4(), title, completed: false };
  todos.push(newTodo);
  await saveTodosToStorage(todos);
  revalidatePath("/");
  return newTodo;
}

export async function updateTodo(
  id: string,
  updates: Partial<{ title: string; completed: boolean }>
) {
  const todos = await getTodosFromStorage();
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex !== -1) {
    todos[todoIndex] = { ...todos[todoIndex], ...updates };
    await saveTodosToStorage(todos);
    revalidatePath("/");
    return todos[todoIndex];
  }
  return null;
}

export async function deleteTodo(id: string) {
  const todos = await getTodosFromStorage();
  const updatedTodos = todos.filter((todo) => todo.id !== id);
  await saveTodosToStorage(updatedTodos);
  revalidatePath("/");
}
