"use client";
import React, { useRef } from "react";
import { useFormStatus } from "react-dom";
import { addTodo } from "../actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="mt-2 w-full bg-black text-white p-2 rounded disabled:opacity-50"
      disabled={pending}
    >
      {pending ? "Adding..." : "Add Todo"}
    </button>
  );
}

export default function AddTodoForm() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData: FormData) => {
        const title = formData.get("title") as string;
        if (title.trim()) {
          await addTodo(title);
          formRef.current?.reset();
        }
      }}
      className="mb-4"
    >
      <input
        type="text"
        name="title"
        placeholder="Add a new Todo"
        className="w-full p-2 border rounded"
      />
      <SubmitButton />
    </form>
  );
}
