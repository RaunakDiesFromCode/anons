// src/components/NewPostForm.tsx
"use client";

import useCreatePost from "@/hooks/useCreatePost";
import { useState } from "react";

const NewPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const mutation = useCreatePost(); // Use the custom hook

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-gray-100 text-black rounded-lg"
    >
      <input
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Submit
      </button>
      {mutation.isError && <p>Error: {mutation.error.message}</p>}
      {mutation.isSuccess && <p>Post created successfully!</p>}
    </form>
  );
};

export default NewPostForm;
