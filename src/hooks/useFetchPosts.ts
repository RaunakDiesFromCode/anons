// src/hooks/useFetchPosts.ts
import { useQuery } from "@tanstack/react-query";
import { Post } from "@/types/types"; // Importing the Post type

const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch("/api/posts");
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

const useFetchPosts = (): {
  data: Post[] | undefined;
  error: Error | null;
  isLoading: boolean;
} => {
  return useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
};

export default useFetchPosts;
