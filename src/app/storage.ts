import { promises } from "dns";
import fs from "fs";
import path from "path";

const STORAGE_FILE = path.join(process.cwd(), "todos.json");

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export async function getTodosFromStorage(): Promise<Todo[]> {
  try {
    const data = await fs.promises.readFile(STORAGE_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function saveTodosToStorage(todos: Todo[]): Promise<void> {
  await fs.promises.writeFile(STORAGE_FILE, JSON.stringify(todos, null, 2));
}
