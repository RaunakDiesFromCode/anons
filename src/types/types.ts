// src/types/types.ts
export type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: Date; // ISO string
  updatedAt: string; // ISO string
  randomUserId: string; // Reference to the user
};

export type Comment = {
  id: number;
  postId: string; // Reference to the post
  content: string;
  createdAt: Date; // ISO string
  updatedAt: string; // ISO string
  randomUserId: string; // Reference to the user
};

export type VoteType = "upvote" | "downvote";
