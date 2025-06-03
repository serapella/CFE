// src/queries.tsimport { connect } from "@/connect";
import { Todo } from "./types";
import { TodoDB } from "./types";

export async function getAllTodos(): Promise<Todo[]> {
  const connection = await connect();
  const [rows] = await connection.query<TodoDB[]>("SELECT * FROM todos");
  return rows.map((x) => ({ ...x, checked: x.checked === 1 }));
}

export async function addTodo(task: string): Promise<void> {
  const connection = await connect();
  await connection.query("INSERT INTO todos (title) VALUES (?)", [task]);
}

export async function toggleTodo(id: number): Promise<void> {
  const connection = await connect();
  await connection.query(
    "UPDATE todos SET checked = NOT checked WHERE id = ?",
    [id]
  );
}

export async function deleteTodo(id: number): Promise<void> {
  const connection = await connect();
  await connection.query("DELETE FROM todos WHERE id = ?", [id]);
}

// Add your data fetching or query logic here. 