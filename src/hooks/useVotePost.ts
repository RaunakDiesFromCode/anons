// src/hooks/useVotePost.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

const votePost = async (data: { postId: string; type: "up" | "down" }) => {
  const response = await fetch(`/api/posts/${data.postId}/votes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: data.type }),
  });

  if (!response.ok) throw new Error("Failed to vote");
  return response.json(); // Adjust based on your API response structure
};

export const useVotePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: votePost,
    onSuccess: () => {
      // Invalidate the posts query to refetch the latest votes or update the state as needed
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error("Error voting post:", error);
    },
  });
};
