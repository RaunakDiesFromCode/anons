// src/hooks/useCreatePost.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "@/types/types"; // Importing the Post type

const createPost = async (data: {
  title: string;
  content: string;
}): Promise<Post> => {
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Failed to create post");
  return response.json(); // This will return a Post type
};

const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error("Error creating post:", error);
    },
  });
};

export default useCreatePost;
