import { useState } from "react";
import { useVotePost } from "@/hooks/useVotePost";
import { Post } from "@prisma/client";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "./ui/button";

const PostCard = ({ post }: { post: Post }) => {
  // Ensure we initialize with a valid number, defaulting to 0 if undefined or null
  const [localVotes, setLocalVotes] = useState<number>(post.votes ?? 0);
  const { mutate: votePost } = useVotePost();

  const handleVote = (type: "up" | "down") => {
    // Check that `localVotes` is a valid number before updating
    setLocalVotes((prevVotes) => {
      const newVotes = prevVotes + (type === "up" ? 1 : -1);
      return isNaN(newVotes) ? 0 : newVotes; // Ensure we don’t accidentally set `NaN`
    });

    votePost(
      { postId: post.id.toString(), type },
      {
        onError: () => {
          // Revert on error
          setLocalVotes((prevVotes) => prevVotes - (type === "up" ? 1 : -1));
        },
      }
    );
  };

  return (
    <div className="shadow p-4 rounded-lg ">
      <h3 className="text-lg font-bold italic">{post.title}</h3>
      <p className="text-sm text-gray-600">Posted by {post.randomUserId} on {new Date(post.createdAt).toLocaleDateString()}</p>
      <p className="mt-2">{post.content}</p>
      {/* Voting buttons */}
      <div className="mt-4 flex gap-2 items-center">
        <Button
          onClick={() => handleVote("up")}
          className="p-1 bg-green-500 text-white rounded"
        >
          <ThumbsUp />
        </Button>
        <span className="text-black">{localVotes.toString()}</span> {/* Ensure it's a string */}
        <Button
          onClick={() => handleVote("down")}
          className="p-1 bg-red-500 text-white rounded"
        >
          <ThumbsDown/>
        </Button>
      </div>
    </div>
  );
};

export default PostCard;
