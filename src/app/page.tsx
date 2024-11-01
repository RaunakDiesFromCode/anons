// src/app/page.tsx
"use client";

import NewPostForm from "@/components/NewPostForm";
import PostList from "@/components/PostList";


const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Anonymous Confessions</h1>
      <NewPostForm />
      <PostList />
    </div>
  );
};

export default HomePage;
