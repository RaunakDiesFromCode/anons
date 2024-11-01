// src/components/PostCard.tsx
"use client";

import { useVotePost } from "@/hooks/useVotePost";
import { Post } from "@prisma/client";

const PostCard = ({ post }: { post: Post }) => {
  const { mutate: votePost } = useVotePost();

  const handleVote = (type: "up" | "down") => {
    votePost({ postId: post.id.toString(), type });
  };

  return (
    <div className="shadow p-4 rounded-lg bg-gray-500">
      <h3 className="text-lg font-bold italic">{post.title}</h3>
      <p className="text-sm text-gray-600">Posted by {post.randomUserId}</p>
      <p className="mt-2">{post.content}</p>
      {/* Voting buttons */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => handleVote("up")}
          className="p-1 bg-green-500 text-white rounded"
        >
          Upvote
        </button>
        <button
          onClick={() => handleVote("down")}
          className="p-1 bg-red-500 text-white rounded"
        >
          Downvote
        </button>
      </div>
    </div>
  );
};

export default PostCard;
