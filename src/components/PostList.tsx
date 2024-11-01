// src/components/PostList.tsx
"use client"; // Make sure this component is a client component

import useFetchPosts from "@/hooks/useFetchPosts"; // Import the custom hook
import PostCard from "./PostCard";

const PostList = () => {
  const { data: posts, error, isLoading } = useFetchPosts(); // Use the custom hook

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts: {error.message}</div>;

  return (
    <div>
      {posts &&
        posts.map((post) => (
          <div key={post.id} className="p-4 border-b">
            <PostCard post={post} />
          </div>
        ))}
    </div>
  );
};

export default PostList;
